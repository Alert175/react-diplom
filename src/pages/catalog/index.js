import Catalog from "../../components/general-components/Catalog";
import {useLocation} from 'react-router-dom'
import {useEffect} from "react";

// window.scrollTo({
//   top: document.querySelector(to.hash).offsetTop,
//   behavior: 'smooth'

const CatalogPage = () => {
    const location = useLocation()

    useEffect(() => {
      const { hash } = location
      if (hash) {
        window.scrollTo({
          // document.querySelector(to.hash).offsetTop
          top: document.querySelector(hash).offsetTop,
          behavior: 'smooth'
        });
        return
      }
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    }, [])

    return <Catalog isFind={true}/>;
};

export default CatalogPage;
