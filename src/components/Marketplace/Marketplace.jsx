import React, { useEffect, useRef, useState } from "react";
import Navbar from "../Home/Navbar";
import { FiFilter } from "react-icons/fi";
import axios from "axios";
import Projectcard from "./Projectcard";
import Paginate from "../Admin/Paginate";

const Marketplace = () => {
  const [projects, setProjects] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const searchRef = useRef();
  const domainRef = useRef();
  const langRef = useRef();
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(6);

  useEffect(() => {
    axios
      .get("http://localhost:3000/projects/getProjects?status=approved")
      .then((response) => {
        // console.log(response.data);
        const data = response.data.map((project) => {
          const html = atob(project.readme);
          const parser = new DOMParser();
          const parsedHtml = parser.parseFromString(html, "text/html");
          const titleElement = parsedHtml.querySelector("h1");
          const languagesElement = parsedHtml.querySelector("h2");
          const descriptionElement = parsedHtml.querySelector("h3");
          const domainElement = parsedHtml.querySelector("h4");
          const imageElement = parsedHtml.querySelector("img");
          return {
            ...project,
            title: titleElement.textContent,
            languages: languagesElement.textContent,
            description: descriptionElement.textContent,
            domain: domainElement.textContent,
            image: imageElement.src,
          };
        });
        setProjects(data);
        setFiltered(data);
      });
  }, []);
  console.log(projects);

  function handleSearch() {
    if (searchRef.current.value === "") {
      setFiltered(projects);
    }
    setFiltered(
      projects.filter((project) => {
        return project.title
          .toLowerCase()
          .includes(searchRef.current.value.toLowerCase());
      })
    );
  }

  function handleDomainChange() {
    if(langRef.current.value === undefined) {
      setFiltered(
        projects.filter((project) => {
          return project.domain
            .toLowerCase()
            .includes(domainRef.current.value.toLowerCase());
        })
      );
    }
    else{
      setFiltered(
        projects.filter((project) => {
          return project.domain
            .toLowerCase()
            .includes(domainRef.current.value.toLowerCase()) && project.languages.includes(langRef.current.value);
        })
      );
    }
  }

  function handleLanguageChange() {
    if(domainRef.current.value === undefined){
      setFiltered(
        projects.filter((project) => {
          return project.languages
            .toLowerCase()
            .includes(langRef.current.value.toLowerCase());
        })
      );
    }
    else{
      setFiltered(
        projects.filter((project) => {
          return (
            project.languages
              .toLowerCase()
              .includes(langRef.current.value.toLowerCase()) &&
            project.domain
              .toLowerCase()
              .includes(domainRef.current.value.toLowerCase())
          );
        })
      );
    }
    
  }

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filtered.slice(
    indexOfFirstProject,
    indexOfLastProject
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(projects.length / projectsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full bg-black">
      <Navbar />
      <div className="w-full h-[80vh]  bg-white border rounded-t-xl">
        <div className="relative top-0  w-full">
          <div className="sticky flex items-start justify-start flex-col py-5">
            <div className="flex items-center w-full py-5 justify-center gap-2">
              <div className="w-[50%] flex items-center justify-center">
                <input
                  className="w-[70%] p-3 rounded-l-3xl border border-black"
                  type="text"
                  placeholder="Search Projects"
                  ref={searchRef}
                  onChange={() => {
                    handleSearch();
                  }}
                />
                <button className="w-[20%] rounded-r-3xl py-3 px-5 border border-black text-yellow-400 bg-black">
                  Search
                </button>
              </div>
              <div className="w-[50%] flex items-center justify-center">
                <select
                  name=""
                  id=""
                  className="w-[40%] py-2 px-3 rounded-l-3xl border border-black"
                  ref={domainRef}
                  onChange={() => {
                    handleDomainChange();
                  }}
                >
                  <option value="" selected disabled>
                    Select Domain
                  </option>
                  <option value="Web">Web</option>
                  <option value="Mobile">Mobile</option>
                </select>
                <select
                  name=""
                  id=""
                  className="w-[40%] py-2 px-3 border border-black"
                  ref={langRef}
                  onChange={() => {
                    handleLanguageChange();
                  }}
                >
                  <option value="" selected disabled>
                    Select Language
                  </option>
                  <option value="React">React</option>
                  <option value="Python">Python</option>
                  <option value="PHP">PHP</option>
                </select>
                <div
                  className="w-[10%] cursor-pointer rounded-r-3xl p-3 border border-black"
                  onClick={() => {
                    domainRef.current.value = "";
                    langRef.current.value = "";
                    setFiltered(projects);
                  }}
                >
                  <FiFilter size={22} />
                </div>
              </div>
            </div>
            <h1 className="text-3xl font-bold text-indigo-500 underline p-5">
              Projects:
            </h1>
          </div>
          <div className="w-full flex items-start justify-start px-5 ">
            <div className="w-full grid grid-cols-3 gap-5 ">
              {currentProjects.map((project, index) => {
                return <Projectcard project={project} />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex items-center justify-center bg-white">
        <Paginate
          projectsPerPage={projectsPerPage}
          totalProjects={projects.length}
          paginate={paginate}
          previousPage={previousPage}
          nextPage={nextPage}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
};

export default Marketplace;
