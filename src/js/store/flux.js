const getState = ({ getStore, getActions, setStore }) => {

	return {
		store: {
			characterList: [],
			selectedItem: {},
			favorites: [],
			demo: [
				{
					title: "FIRST",
					background: "white",
					initial: "white"
				},
				{
					title: "SECOND",
					background: "white",
					initial: "white"
				}
			]
		},

		actions: {
			// Getting Characters function
			getCharacters: async () => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/`);
					const data = await response.json();
					setStore({ characterList: data.results });
					console.log(data.results); // Mostrar los datos en la consola
				} catch (error) {
					console.error("Error getting contacts:", error);
				}
			},


			getCharacterData: async (id) => {
				try {
					const response = await fetch(`https://www.swapi.tech/api/people/${id}`);
					const data = await response.json();
					const characterData = {
						name: data.result.properties.name,
						gender: data.result.properties.gender,
						eye_color: data.result.properties.eye_color,
						hair_color: data.result.properties.hair_color,
						description: data.result.description
					};
					console.log(characterData);
					return characterData;
				} catch (error) {
					console.error("Error getting character data:", error);
				}
			},


			addToFavorites: character => {
				const store = getStore();
				const favorites = [...store.favorites, character];
				setStore({ favorites });
			},

			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},
			loadSomeData: () => {
				/**
					fetch().then().then(data => setStore({ "foo": data.bar }))
				*/
			},
			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;


