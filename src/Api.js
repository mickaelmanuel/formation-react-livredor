import axios from "axios";

export const Api = {
  getMessages: async () => {
    const res = await axios.get("https://livredor-api.herokuapp.com/messages");
    return res.data;
  },
  postMessage: async (token, message, responseFunction, errorFunction) => {
    axios
      .post(
        "https://livredor-api.herokuapp.com/message",
        {
          content: message
        },
        {
          headers: { Authorization: "Bearer " + token }
        }
      )
      .then(async result => {
        await responseFunction(result);
      })
      .catch(error => {
        errorFunction(error);
      });
  }
};
