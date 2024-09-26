# Tamper Proof Data

At Bequest, we require that important user data is tamper proof. Otherwise, our system can incorrectly distribute assets if our internal server or database is breached.

**1. How does the client ensure that their data has not been tampered with?**

The client uses a hash (a unique code) to check the data before sending it.
If the server calculates the same hash from the received data, it means the data is safe.
If not, it alerts the client that the data might have been changed.

<br />
**2. If the data has been tampered with, how can the client recover the lost data?**

If tampering is detected, the client can restore the original data from a local backup they kept before the update.
Alternatively, they can request the last correct version from the server if it stores previous data.

Edit this repo to answer these two questions using any technologies you'd like, there any many possible solutions. Feel free to add comments.

### To run the apps:

`npm run start` in both the frontend and backend

## To make a submission:

1. Clone the repo
2. Make a PR with your changes in your repo
3. Email your github repository to robert@bequest.finance
