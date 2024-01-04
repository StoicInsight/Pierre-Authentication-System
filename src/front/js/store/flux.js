const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      token: null,
      user: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      validateUser: async (token) => {
        const opts = {
          methods: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer" + " " + token,
          },
        };

        try {
          const res = await fetch(
            "https://probable-disco-55v7qjqv9vxh4vww-3001.app.github.dev/api/private",
            opts
          );
          console.log("validation response", res);
          return true;
        } catch (error) {
          console.log("Validation error", error);
          return false;
        }
      },

      signUpUser: async (email, password) => {
        try {
          await fetch(
            "https://probable-disco-55v7qjqv9vxh4vww-3001.app.github.dev/api/create-user",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email, password: password }),
            }
          );
          return true;
        } catch (error) {
          console.error("Signup error", error);
        }
      },

      login: async (email, password) => {
        try {
          const data = await fetch(
            "https://probable-disco-55v7qjqv9vxh4vww-3001.app.github.dev/api/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ email: email, password: password }),
            }
          );

          const res = await data.json();

          sessionStorage.setItem("Token", res.TOKEN);
          sessionStorage.setItem("User", res.User.email);
          setStore({ token: res.TOKEN, user: res.User.email });
          return true;
        } catch (error) {
          // console.error("Error getting token", error);
          return error;
        }
      },

      logout: () => {
        sessionStorage.removeItem("Token");
        sessionStorage.removeItem("User");
        setStore({ token: null, user: null });
      },

      syncToken: () => {
        const store = getStore();
        const token = sessionStorage.getItem("Token");
        if (token !== null || token !== undefined || token !== "")
          setStore({ token: token });
      },

      getMessage: async () => {
        try {
          // fetching data from the backend
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello");
          const data = await resp.json();
          setStore({ message: data.message });
          // don't forget to return something, that is how the async resolves
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
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
      },
    },
  };
};

export default getState;
