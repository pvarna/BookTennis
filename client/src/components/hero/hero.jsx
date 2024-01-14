import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { homePath, loginPath, registerPath } from "../../routes/constants";

export const Hero = ({ content, title }) => {
    const navigate = useNavigate()

  return (
    <section className="text-center lg:w-full lg:py-20 lg:text-left">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className=" relative lg:flex">
          <div className="pb-16 pt-10 lg:min-w-[40rem] lg:pr-20 lg:pt-16">
            <div className="mx-auto w-full max-w-3xl">
              <h1 className="mb-4 mt-0 text-4xl font-bold md:text-5xl ">
                {title}
              </h1>
              <p className="prose prose-xl m-auto text-white">{content}</p>
            </div>
          </div>

          </div>
        </div>

        <div className="flex flex-row flex-wrap justify-center ">
              <Button
                variant="contained"
                type="button"
                onClick={() => navigate(loginPath)}
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214", marginRight: "20px" }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={() => navigate(registerPath)}
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214", marginRight: "20px"  }}
              >
                Register
              </Button>
              <Button
                variant="contained"
                type="button"
                onClick={() => navigate(homePath)}
                sx={{ mt: 3, mb: 2, backgroundColor: "#EE7214" }}
              >
                Browse clubs
              </Button>
            </div>
    </section>
  );
};