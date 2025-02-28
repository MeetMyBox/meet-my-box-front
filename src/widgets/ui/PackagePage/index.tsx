import { Packages, PackagesPC, type PackageProps } from "@entities/Packages";
import { useGetPackages } from "@shared/lib/hooks/Packages/useGetPackages";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export const PackagesPage = () => {
  const [packages, setPackages] = useState<PackageProps[]>([]);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const fetchedPackages = await useGetPackages();
        // console.log("Fetched Packages:", fetchedPackages); // Debug output
        setPackages(fetchedPackages || []);
      } catch (error) {
        console.error("Error fetching packages:", error);
      }
    };

    fetchPackages();
  }, []); // Ensure useEffect runs only once

  return (
    <>
      <div className={styles.package}>
        <h2 className={styles.package__heading}>Мои посылки</h2>
        {packages.length > 0 ? (
          <Packages items={packages} />
        ) : (
          <p>Здесь пусто...</p>
        )}
      </div>
      <div className={styles.package_pc}>
        <h2 className={styles.package_pc__heading}>Мои посылки</h2>
        {packages.length > 0 ? (
          <PackagesPC items={packages} />
        ) : (
          <p>Здесь пусто...</p>
        )}
      </div>
    </>
  );
};
