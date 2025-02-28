import contact_img from "@assets/pexels-tima-miroshnichenko-6169025.jpg";
import {
  ContactForm,
  ContactFormPC,
} from "@features/Form/Contact/contact-form";
import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import { ContactLink } from "@shared/ui/Link/Contact/contact-link";
import { Paragraph } from "@shared/ui/Paragraph/ui/paragraph";
import parse from "html-react-parser";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const ContactScreen = () => {
  const [contact, setContact] = useState<any>();
  // const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchBlock = async () => {
      try {
        // setIsLoading(true);
        const block = await useGetBlock("/api/contact-blocks/1");
        setContact(block);
      } catch (error) {
        console.error("Error fetching packages:", error);
      } finally {
        // setIsLoading(false);
      }
    };

    fetchBlock();
  }, []);

  return (
    <>
      {contact ? (
        <>
          <section className={styles.contact} id="contacts-mob">
            <span className={styles.contact__heading}>{contact.heading}</span>
            <Paragraph margin="mt-4" width="w-3/4" isCentered={true}>
              {parse(contact.paragraph)}
            </Paragraph>
            <ContactForm />
            <ContactLink
              text={contact.link[0].text}
              link={contact.link[0].link}
              margin="mt-4"
            />
            <ContactLink
              text={contact.link[1].text}
              link={contact.link[1].link}
              margin="mt-4"
            />
            <img
              src={contact_img.src}
              alt="form_img"
              // width={400}
              // height={400}
              loading="lazy"
              className="mt-4 w-full mb-8"
              width={512}
              height={256}
            />
          </section>
          <section className={styles.contact_pc} id="contacts-pc">
            <div className={styles.contact_pc__left}>
              <span className={styles.contact_pc__heading}>
                {contact.heading}
              </span>
              <Paragraph width="w-3/4">{parse(contact.paragraph)}</Paragraph>
              <ContactFormPC />
              <ContactLink
                text={contact.link[0].text}
                link={contact.link[0].link}
                margin="mt-4"
              />
              <ContactLink
                text={contact.link[1].text}
                link={contact.link[1].link}
                margin="mt-4 mb-8"
              />
            </div>
            <img
              src={contact_img.src}
              alt="form_img"
              loading="lazy"
              // width={400}
              // height={400}
              className={`${styles.contact_pc__img}`}
              width={512}
              height={256}
            />
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
