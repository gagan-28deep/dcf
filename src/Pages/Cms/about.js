import { CardContent, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header, Paragraph, CustomCard } from "./common.js";
import Loader from "../../Components/Loader/Loader";
import http from "../../Config/HTTP_request";

const About = () => {
  const [posts, setPosts] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchdata = async () => {
    setLoading(true);
    let api = {
      path: "cmsView/5fd31ce8b4504b2731ba57a7",
      method: "GET",
    };
    let response = await http(api);
    if (response.response) {
      setLoading(false);
      console.log("response.response", response.response);
    } else {
      if (response.status === 200) {
        let apidata = response.data.data[0];
        console.log("response", apidata);
        setPosts((prevState) => ({
          ...prevState,
          title: apidata.title,
          content: apidata.content,
        }));
        setLoading(false);
      }
    }
  };

  function createMarkup() {
    return { __html: posts.content };
  }

  useEffect(() => {
    fetchdata();
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Container maxWidth>
          <CustomCard>
            <CardContent>
              <Header variant="h3" component="div">
                {posts.title}
              </Header>
              <Paragraph paragraph dangerouslySetInnerHTML={createMarkup()} />
            </CardContent>
          </CustomCard>
        </Container>
      )}
    </>
  );
};

export default About;
