import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import { Sections } from 'enums/SectionType';
import { getSearchParams } from 'helpers/searchHelpers';
import { AboutUs, Composers, MainPage, Navbar, Track, Tracks } from 'pages/components';
import { useAppContext } from 'providers/app/app.providers';
import './App.css';

function App() {
  const { pathname, search } = useLocation();
  const { setSection1, setSection2, setSection3, setSection4, setSearchParams } = useAppContext();

  useEffect(() => {
    const [section1, section2, section3, section4] = pathname.split('/').slice(1);
    const searchParams = search.slice(1).split('&').map((param) => 
      [param.slice(0, param.indexOf('=')), decodeURI(param.slice(param.indexOf('=') + 1))]
    );
    setSection1(`/${section1}` as Sections);
    setSection2(section2);
    setSection3(section3 && Number(section3) >= 1 ? Number(section3) : 1);
    setSection4(section4);
    setSearchParams(getSearchParams(searchParams));
  }, [pathname, search, setSection1, setSection2, setSection3, setSection4, setSearchParams]);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path={Sections.MAIN_PAGE} key="home" element={<MainPage />} />
        <Route path={Sections.TRACKS} key='tracks' element={<Tracks />} />
        <Route path={`${Sections.TRACKS}/:categoryId`} key='composer' element={<Tracks />} />
        <Route path={`${Sections.TRACKS}/:categoryId/:page`} key='page' element={<Tracks />} />
        <Route path={`${Sections.TRACKS}${Sections.TRACK}/:trackId`} key='track' element={<Track />} />
        <Route path={Sections.COMPOSERS} key='composers' element={<Composers />} />
        <Route path={Sections.ABOUT_US} key='aboutus' element={<AboutUs />} />
      </Routes>
    </div>
  );
}

export default App;
