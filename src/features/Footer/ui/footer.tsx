import logo from "@assets/logo_white.svg";
import { useGetBlock } from "@shared/lib/hooks/useGetBlock";
import Button from "@shared/ui/Button/ui/Footer/button";
import {
  FooterLinks,
  FooterLinksPC,
} from "@shared/ui/Link/Footer/footer-links";
import { SocialMediaLinks } from "@shared/ui/Link/Social/social-links";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const Footer: React.FC = () => {
  const [footer, setFooter] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlock = async () => {
      try {
        setIsLoading(true);
        const block = await useGetBlock("/api/footers/1");
        setFooter(block);
      } catch (error) {
        console.error("Error fetching footer data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlock();
  }, []);

  // Return loader if data is still being fetched
  if (isLoading) {
    return null;
  }
  const currentYear = new Date().getFullYear();

  // Return the complete footer structure once data is fetched
  return (
    <>
      <>
        <footer className={styles.footer} id="footer">
          <a
            href="#main-mob"
            className="w-full flex items-center justify-center"
          >
            <img
              width={400}
              height={400}
              onClick={() => (window.location.href = "/")}
              src={logo.src}
              loading="lazy"
              alt="footer_logo"
              className={styles.footer__logo}
            />
          </a>
          {/* Conditional rendering to handle undefined or missing links */}
          {footer?.links ? <FooterLinks footerLinks={footer.links} /> : null}
          <Button text="Вверх" buttonType="filled" />
          <SocialMediaLinks />
        </footer>
        <footer className={styles.footer_pc} id="footer">
          <div className={styles.footer_pc__nav}>
            <img
              loading="lazy"
              src={logo.src}
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              alt="footer_logo"
              className={`${styles.footer_pc__logo} cursor-pointer`}
            />
            {/* Conditional rendering for desktop links */}
            {footer?.links ? (
              <FooterLinksPC footerLinks={footer.links} />
            ) : null}
            <Button
              text="Вверх"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              buttonType="filled"
              margin="hover:text-white"
            />
          </div>
          <SocialMediaLinks />
          <span className="text-white flex flex-col items-center mb-4 text-sm">
            © Meetmybox.com {currentYear}
            <span className="text-sm mt-2">
              Все права защищены. All rights reserved.
            </span>
          </span>
        </footer>
      </>
    </>
  );
};

// export const Footer = () => {
//   const [footer, setFooter] = useState<any>();
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchBlock = async () => {
//       try {
//         setIsLoading(true);
//         const block = await useGetBlock("/api/footers/1");
//         console.log("MYMYMYBLOCK", block);
//         setFooter(block);
//       } catch (error) {
//         console.error("Error fetching packages:", error);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlock();
//   }, []);

//   return (
//     <div>
//       {isLoading ? (
//         <p>Loading...</p>
//       ) : (
//         <footer>
//           {footer ? <div>{footer.content}</div> : "No footer content"}
//         </footer>
//       )}
//     </div>
//   );
// };
