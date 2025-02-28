import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import { FAQList } from "@shared/ui/Accordion/faq-accordion";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const FAQScreen = () => {
  const [items, setItems] = useState<any>();
  useEffect(() => {
    const fetchBlock = async () => {
      try {
        const block = await useGetBlock("/api/faqs/1");
        setItems(block);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchBlock();
  }, []);
  const currentYear = new Date().getFullYear();
  return (
    <>
      {items ? (
        <>
          <section className={`${styles.faq} w-full`} id="faq">
            <span className={styles.faq__heading}>FAQ</span>
            <FAQList items={items.questions} />
            <div className="w-full flex items-center justify-center">
              <button className="text-black text-sm mt-8">
                Еще больше ответов на вопросы{" "}
                <a href="/faq" className="text-main">
                  здесь
                </a>
              </button>
            </div>
          </section>
        </>
      ) : (
        <></>
      )}
    </>
  );
};
