import { Box, CardContent, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Header, CustomTermHeader, Paragraph, CustomCard } from "./common.js";
import Loader from "../../Components/Loader/Loader";
import http from "../../Config/HTTP_request";

const TermsandCondition = () => {
  const [posts, setPosts] = useState({
    title: "",
    content: "",
  });
  const [loading, setLoading] = useState(true);
  const fetchdata = async () => {
    setLoading(true);
    let api = {
      path: "cmsView/5fd31d23b4504b2731ba57ab",
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
              <CustomTermHeader variant="h3" component="div">
                Welcome to Doctor Plaza Terms & Conditions
              </CustomTermHeader>
              <Box sx={{ marginTop: 2 }}>
                <Paragraph paragraph dangerouslySetInnerHTML={createMarkup()} />
              </Box>
            </CardContent>
          </CustomCard>
        </Container>
      )}
    </>
  );
};
export default TermsandCondition;
