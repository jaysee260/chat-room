const registrationService = {
    createUser: async function(payload) {
        // this is where we'd call the chatroom's backend, which consequently
        // calls the user-registration service hosted in myazure-idsrv
        const request = {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        };

        var response = await fetch("/signup", request);
        return response.json();
    }
};