const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			characterList: [],
			planetsList: [],
			vehiclesList: [],
			selectedItem: {},
			favorites: [],
			authToken: sessionStorage.getItem('token') || null,
			isAuthenticated: false

		},

		actions: {
			// Add contact function
			createUser: async (newUser) => {
				try {
					const response = await fetch("https://ferrami-cautious-goldfish-5pg5p5p96jxf49rq-3000.preview.app.github.dev/user", {
						method: "POST",
						body: JSON.stringify(newUser),
						headers: {
							"Content-Type": "application/json"
						}
					});
					const data = await response.json();
					console.log("Contact has been added:", data);
					// Handle the response or update the store with the new contact as needed
				} catch (error) {
					console.error("Error adding contact:", error);
				}
			},

			login: async ({ email, password }) => {
				try {
					console.log(email, password)
					const response = await fetch("https://ferrami-cautious-goldfish-5pg5p5p96jxf49rq-3000.preview.app.github.dev/token", {
						method: 'POST',
						body: JSON.stringify({ email, password }),
						headers: {
							"Content-Type": "application/json"
						}
					});

					if (!response.ok) {
						throw new Error("Invalid username or password");
					}

					const data = await response.json();
					const token = data.token;

					sessionStorage.setItem('token', token);

					setStore({ authToken: token, isAuthenticated: true });

				} catch (error) {
					console.error('Error in login:', error.message);
				}
			},

			logout: () => {
				sessionStorage.removeItem('token');
				setStore({ authToken: null, isAuthenticated: false });
			},

			checkAuth: () => {
				try {
					const authToken = sessionStorage.getItem('token');
					if (authToken) {
						setStore({ authToken, isAuthenticated: true });
					} else {
						setStore({ authToken: null, isAuthenticated: false });
					}
				} catch (error) {
					console.error('Error while checking authentication:', error.message);
					setStore({ authToken: null, isAuthenticated: false });
				}
			},


			// Getting Characters functions
			getCharacters: async () => {
				try {
					const { characterList } = getStore();
					const cacheExpirationTime = 60000; // 1 minute in milliseconds

					if (characterList.length > 0 && Date.now() - characterList[0].timestamp < cacheExpirationTime) {
						// If data is already stored in cache and not expired, return the cached data.
						return;
					}

					const response = await fetch(`https://www.swapi.tech/api/people/`);
					const data = await response.json();
					const { results } = data;
					const updatedCharacterList = results.map(character => ({ ...character, timestamp: Date.now(), id: character.uid }));
					setStore({ characterList: updatedCharacterList });

					for (const character of updatedCharacterList) {
						await getActions().getCharacterData(character.id);
					}

					await new Promise(resolve => setTimeout(resolve, 1000));
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},


			getCharacterData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}/`);
					const data = await response.json();
					const { properties, description } = data.result;
					const characterData = { ...properties, description, id }; // Include the 'id' in the returned characterData object
					return characterData;
				} catch (error) {
					console.error("Error getting character data:", error);
				}
			},


			getCharacterId: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}/`);
					const data = await response.json();
					const characterId = data.results[0]?.uid || null;
					return characterId;
				} catch (error) {
					console.error("Error getting character ID:", error);
				}
			},

			// GET ALL PLANETS
			getPlanets: async () => {
				try {
					const { planetsList } = getStore();

					if (planetsList.length > 0) {
						return;
					}
					const response = await fetch(`https://www.swapi.tech/api/planets?page=1&limit=10`);
					const data = await response.json();
					const { results } = data;
					setStore({ planetsList: results });


					await new Promise(resolve => setTimeout(resolve, 1000));
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},

			// GET PLANET DATA
			getPlanetData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}`);
					const data = await response.json();
					const { description } = data.result;
					const { name, population, diameter, rotation_period, orbital_period, gravity, climate, terrain, surface_water } = data.result.properties;
					const planetData = { id, name, description, population, diameter, rotation_period, orbital_period, gravity, climate, terrain, surface_water };
					return planetData;
				} catch (error) {
					console.error("Error getting planet data:", error);
				}
			},

			// GET ALL VEHICLES
			getVehicles: async () => {
				try {
					const { vehiclesList } = getStore();

					if (vehiclesList.length > 0) {
						return;
					}

					const response = await fetch(`https://www.swapi.tech/api/vehicles?page=1&limit=10`);
					const data = await response.json();
					const { results } = data;
					setStore({ vehiclesList: results });


					// Esperar 1 segundo antes de hacer la siguiente solicitud
					await new Promise(resolve => setTimeout(resolve, 1000));

				} catch (error) {
					console.error("Error getting vehicles:", error);
				}
			},

			getVehicleData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/vehicles/${id}/`);
					const data = await response.json();
					const { name, model, vehicle_class, manufacturer, cost_in_credits, length, crew, passengers, max_atmosphering_speed, cargo_capacity, consumables, url } = data.result.properties;
					const vehicleData = { id, name, model, vehicle_class, manufacturer, cost_in_credits, length, crew, passengers, max_atmosphering_speed, cargo_capacity, consumables, url };
					return vehicleData;
				} catch (error) {
					console.error("Error getting planet data:", error);
				}
			},

			addToFavorites: item => {
				const { favorites } = getStore();

				const existingItem = favorites.find(favorite => favorite.name === item.name);
				if (existingItem) {
					return;
				}

				const updatedFavorites = [...favorites, item];
				setStore({ favorites: updatedFavorites });
				console.log(updatedFavorites)
			},

			removeFromFavorites: name => {
				const { favorites } = getStore();

				const updatedFavorites = favorites.filter(favorite => favorite.name !== name);
				setStore({ favorites: updatedFavorites });
			}



		}
	};
};

export default getState;


