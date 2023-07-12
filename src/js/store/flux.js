const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			characterList: [],
			planetsList: [],
			vehicleList: [],
			selectedItem: {},
		},

		actions: {
			// Getting Characters functions
			getCharacters: async () => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/`);
					const data = await response.json();
					const { results } = data;
					setStore({ characterList: results });
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},

			getCharacterData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}/`);
					const data = await response.json();
					const { name, gender, eye_color, hair_color, description } = data.result.properties;
					const characterData = { id, name, gender, eye_color, hair_color, description };
					return characterData;
				} catch (error) {
					console.error("Error getting character data:", error);
				}
			},

			// Getting Planets functions
			getPlanets: async () => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/`);
					const data = await response.json();
					const { results } = data;
					setStore({ planetsList: results });
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},

			getPlanetData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/planets/${id}/`);
					const data = await response.json();
					const { uid, name, population } = data.result.properties;
					const planetData = { id, uid, name, population };
					return planetData;
					ß
				} catch (error) {
					console.error("Error getting planet data:", error);
				}
			},

			// //Geting Vehicles Functions
			// getVehicles: async () => {
			// 	try {
			// 		const response = await fetch(`https://www.swapi.tech/api/vehicles/`);
			// 		const data = await response.json();
			// 		const { results } = data;
			// 		setStore({ vehicleList: results });
			// 		console.log(results)
			// 	} catch (error) {
			// 		console.error("Error getting contacts:", error);
			// 	}
			// },

		}
	};
};

export default getState;


