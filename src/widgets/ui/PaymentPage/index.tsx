import { PaymentForm } from "@features/PaymentForm";
import { useCreatePayment } from "@shared/lib/hooks/useCreatePayment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

// Initialize Stripe with your publishable key
const stripePromise = loadStripe(
  "pk_live_51Q142VRwuyHMOHJmDuYHnUiZDu0Q7r4k99GEv9Yt7w02045Vap5fXuvE6F3e1KCG5QoLNeL1a5FeXd9ObghCkotB00bBRD1M8f"
);

export const PaymentPage = () => {
  const [clientSecret, setClientSecret] = useState<string | null>(null); // State to store client secret
  const [amount, setAmount] = useState<number>(0); // State to store amount

  useEffect(() => {
    // Fetch the client secret when the component mounts
    const fetchClientSecret = async () => {
      try {
        const { client_secret, amount } = await useCreatePayment();

        setClientSecret(client_secret); // Set the client secret correctly
        setAmount(amount); // Set the amount to be charged correctly
        // console.log(client_secret, amount); // Log the client secret and amount
      } catch (error) {
        console.error("Error fetching payment details:", error);
      }
    };

    fetchClientSecret();
  }, []);

  return (
    <div className={styles.additional_service}>
      {clientSecret ? (
        // Wrap the PaymentForm with the Elements provider
        <Elements stripe={stripePromise}>
          <PaymentForm clientSecret={clientSecret} amount={amount} />
        </Elements>
      ) : (
        <></>
      )}
    </div>
  );
};
