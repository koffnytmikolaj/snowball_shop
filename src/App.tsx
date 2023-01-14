import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { sections } from 'enums/SectionType';
import { AboutUs, MainPage, Navbar, Product, Tracks } from 'pages/components';
import { useAppContext } from 'providers/app/app.providers';
import './App.css';

function App() {
  const pathname = useLocation().pathname;
  const { setLocation } = useAppContext();

  useEffect(() => {
    const [section1, section2, section3, section4] = pathname.split('/').slice(1);
    setLocation({ 
      section1: `/${section1}` as sections, 
      section2: section2 as string,
      section3: section3 ? Number(section3) : 1, 
      section4 
    });
  }, [pathname, setLocation]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={sections.MAIN_PAGE} key="home" element={<MainPage />} />
        <Route path={sections.TRACKS} key='tracks' element={<Tracks />} />
        <Route path={`${sections.TRACKS}/:categoryId`} key='composer' element={<Tracks />} />
        <Route path={`${sections.TRACKS}/:categoryId/:page`} key='page' element={<Tracks />} />
        <Route path={`${sections.TRACKS}/product/:productId`} key='product' element={<Product />} />
        <Route path={sections.ABOUT_US} key='aboutus' element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
