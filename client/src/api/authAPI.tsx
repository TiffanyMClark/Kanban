import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  try {
    const response = await fetch("/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInfo),
    });

    if (!response.ok) {
      // Check if the response was not OK and throw an error with the status
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    // Only parse the response as JSON if the response was OK
    const data = await response.json();

    return data;
  } catch (err) {
    console.log("Error from user login: ", err);
    return Promise.reject("Could not fetch user info");
  }
};

export { login };
