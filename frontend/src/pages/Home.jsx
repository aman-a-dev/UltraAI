import React, {
    useEffect,
    useState,
    useRef,
    Suspense,
    useContext
} from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// gsap library
import gsap from "gsap";
// tree js library
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Stars } from "@react-three/drei";
// components
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";
const Loader = React.lazy(() => import("../components/Loader.jsx"));
// css
import "../css/Home.css";
export const apiUrl = import.meta.env.VITE_API_URL;
import { AuthContext } from "../context/AuthContext";

export default function Home() {
    useEffect(() => {
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);
    return (
        <>
            <Nav />
            <Intro />
            <Rate />
            <React.Suspense fallback={<Loader position={{}} />}>
                <ImageGallery />
            </React.Suspense>
            <PoweredBy />
            <Footer />
        </>
    );
}

function Intro() {
    const { isAuthenticated, user, logout } = useContext(AuthContext);

    const introHeading = useRef(null);
    const getStartedBtn = useRef(null);
    useEffect(() => {
        setTimeout(function () {
            getStartedBtn.current.focus();
        }, 1000);

        gsap.fromTo(
            introHeading.current,
            { x: 70 },
            { x: 0, duration: 3, ease: "elastic.out" }
        );
    }, []);
    return (
        <div className="main-intro">
            <div>
                <h1 ref={introHeading}>
                    Start chatting with world 🌎{" "}
                    <span class="colored">ultimate</span> AI tool.
                </h1>
                <p>An ai tool powered by ChatGPT Gemini and DeepSeek. </p>
                {isAuthenticated ? (
                    <Link to="/Chatbot">
                        <button ref={getStartedBtn} id="btn">
                            Get Started
                        </button>
                    </Link>
                ) : (
                    <Link to="/Plan">
                        <button ref={getStartedBtn} id="btn">
                            Get Started
                        </button>
                    </Link>
                )}
            </div>
            <Galaxy3D />
        </div>
    );
}

function GalaxyModel() {
    const ref = useRef();
    const { scene } = useGLTF("/models/space.glb");

    useFrame(() => {
        if (ref.current) {
            ref.current.rotation.y += 0.001;
            ref.current.rotation.x += 0.0005;
        }
    });

    return (
        <primitive ref={ref} object={scene} scale={2.2} position={[0, 0, 0]} />
    );
}

function Galaxy3D() {
    return (
        <div className="galaxy-bg">
            <Canvas camera={{ position: [0, 8, 8], fov: 50 }}>
                <ambientLight intensity={1.5} />
                <pointLight
                    position={[10, 10, 10]}
                    color="#ffffff"
                    intensity={1}
                />
                <Stars
                    radius={100}
                    depth={50}
                    count={2000}
                    factor={4}
                    fade
                    speed={1}
                />
                <GalaxyModel />
                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    enableRotate={false}
                />
            </Canvas>
        </div>
    );
}

function Rate() {
    const starRef = useRef(null);
    useEffect(() => {
        setTimeout(function () {
            starRef.current.click();
        }, 2000);
    }, []);
    return (
        <div className="main-rate">
            <h2>From 23,000+ peoples</h2>
            <div className="rating">
                <input
                    type="radio"
                    id="star-1"
                    name="star-radio"
                    value="star-1"
                    ref={starRef}
                />
                <label htmlFor="star-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            pathLength="360"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                    </svg>
                </label>
                <input
                    type="radio"
                    id="star-2"
                    name="star-radio"
                    value="star-1"
                />
                <label htmlFor="star-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            pathLength="360"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                    </svg>
                </label>
                <input
                    type="radio"
                    id="star-3"
                    name="star-radio"
                    value="star-1"
                />
                <label htmlFor="star-3">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            pathLength="360"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                    </svg>
                </label>
                <input
                    type="radio"
                    id="star-4"
                    name="star-radio"
                    value="star-1"
                />
                <label htmlFor="star-4">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            pathLength="360"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                    </svg>
                </label>
                <input
                    type="radio"
                    id="star-5"
                    name="star-radio"
                    value="star-1"
                />
                <label htmlFor="star-5">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            pathLength="360"
                            d="M12,17.27L18.18,21L16.54,13.97L22,9.24L14.81,8.62L12,2L9.19,8.62L2,9.24L7.45,13.97L5.82,21L12,17.27Z"
                        ></path>
                    </svg>
                </label>
            </div>
            <div className="reviewers"></div>
        </div>
    );
}

const ImageGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    images.sort(() => 0.5 - Math.random());

    useEffect(() => {
        axios
            .get(`${apiUrl}/api/images`)
            .then(response => {
                setImages(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.log("Error fetching images:", error);
                setLoading(false);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            {loading ? (
                <Loader position={{ inset: 0 }} />
            ) : (
                <div className="main-gallery">
                    {images.map((src, index) => (
                        <img
                            key={index}
                            src={apiUrl + src}
                            alt={`ai-image-${index}`}
                            loading="lazy"
                        />
                    ))}
                </div>
            )}
            <Link to="/ImgGen">
                <button className="Btn">UltraAI Image Generator</button>
            </Link>
        </>
    );
};

function PoweredBy() {
    return (
        <div className="main-poweredby">
            <h1>
                Powered By <span className="colored">:-</span>
            </h1>
            <PoweredCompony
                name="ChatGPT"
                logo={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 50 50"
                    >
                        <path d="M45.403,25.562c-0.506-1.89-1.518-3.553-2.906-4.862c1.134-2.665,0.963-5.724-0.487-8.237	c-1.391-2.408-3.636-4.131-6.322-4.851c-1.891-0.506-3.839-0.462-5.669,0.088C28.276,5.382,25.562,4,22.647,4	c-4.906,0-9.021,3.416-10.116,7.991c-0.01,0.001-0.019-0.003-0.029-0.002c-2.902,0.36-5.404,2.019-6.865,4.549	c-1.391,2.408-1.76,5.214-1.04,7.9c0.507,1.891,1.519,3.556,2.909,4.865c-1.134,2.666-0.97,5.714,0.484,8.234	c1.391,2.408,3.636,4.131,6.322,4.851c0.896,0.24,1.807,0.359,2.711,0.359c1.003,0,1.995-0.161,2.957-0.45	C21.722,44.619,24.425,46,27.353,46c4.911,0,9.028-3.422,10.12-8.003c2.88-0.35,5.431-2.006,6.891-4.535	C45.754,31.054,46.123,28.248,45.403,25.562z M35.17,9.543c2.171,0.581,3.984,1.974,5.107,3.919c1.049,1.817,1.243,4,0.569,5.967	c-0.099-0.062-0.193-0.131-0.294-0.19l-9.169-5.294c-0.312-0.179-0.698-0.177-1.01,0.006l-10.198,6.041l-0.052-4.607l8.663-5.001	C30.733,9.26,33,8.963,35.17,9.543z M29.737,22.195l0.062,5.504l-4.736,2.805l-4.799-2.699l-0.062-5.504l4.736-2.805L29.737,22.195z M14.235,14.412C14.235,9.773,18.009,6,22.647,6c2.109,0,4.092,0.916,5.458,2.488C28,8.544,27.891,8.591,27.787,8.651l-9.17,5.294	c-0.312,0.181-0.504,0.517-0.5,0.877l0.133,11.851l-4.015-2.258V14.412z M6.528,23.921c-0.581-2.17-0.282-4.438,0.841-6.383	c1.06-1.836,2.823-3.074,4.884-3.474c-0.004,0.116-0.018,0.23-0.018,0.348V25c0,0.361,0.195,0.694,0.51,0.872l10.329,5.81	L19.11,34.03l-8.662-5.002C8.502,27.905,7.11,26.092,6.528,23.921z M14.83,40.457c-2.171-0.581-3.984-1.974-5.107-3.919	c-1.053-1.824-1.249-4.001-0.573-5.97c0.101,0.063,0.196,0.133,0.299,0.193l9.169,5.294c0.154,0.089,0.327,0.134,0.5,0.134	c0.177,0,0.353-0.047,0.51-0.14l10.198-6.041l0.052,4.607l-8.663,5.001C19.269,40.741,17.001,41.04,14.83,40.457z M35.765,35.588	c0,4.639-3.773,8.412-8.412,8.412c-2.119,0-4.094-0.919-5.459-2.494c0.105-0.056,0.216-0.098,0.32-0.158l9.17-5.294	c0.312-0.181,0.504-0.517,0.5-0.877L31.75,23.327l4.015,2.258V35.588z M42.631,32.462c-1.056,1.83-2.84,3.086-4.884,3.483	c0.004-0.12,0.018-0.237,0.018-0.357V25c0-0.361-0.195-0.694-0.51-0.872l-10.329-5.81l3.964-2.348l8.662,5.002	c1.946,1.123,3.338,2.937,3.92,5.107C44.053,28.249,43.754,30.517,42.631,32.462z"></path>
                    </svg>
                }
            />
            <PoweredCompony
                name="DeepSeek"
                logo={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 50 50"
                    >
                        <path d="M49.475,10.462c-0.53-0.26-0.758,0.235-1.067,0.486c-0.106,0.081-0.196,0.186-0.285,0.284	c-0.774,0.827-1.678,1.37-2.86,1.305c-1.727-0.097-3.202,0.446-4.506,1.767c-0.277-1.629-1.198-2.602-2.599-3.226	c-0.733-0.324-1.475-0.649-1.988-1.354c-0.359-0.502-0.456-1.062-0.636-1.613c-0.114-0.332-0.228-0.673-0.611-0.73	c-0.416-0.065-0.579,0.284-0.742,0.576c-0.652,1.192-0.904,2.505-0.88,3.834c0.057,2.991,1.32,5.374,3.83,7.068	c0.285,0.195,0.359,0.389,0.269,0.673c-0.171,0.584-0.375,1.151-0.554,1.735c-0.114,0.373-0.285,0.454-0.684,0.292	c-1.377-0.575-2.567-1.427-3.618-2.456c-1.784-1.727-3.398-3.631-5.41-5.123c-0.473-0.349-0.945-0.673-1.434-0.981	c-2.053-1.994,0.269-3.631,0.807-3.826c0.562-0.203,0.196-0.9-1.622-0.892c-1.817,0.008-3.479,0.616-5.598,1.427	c-0.31,0.122-0.636,0.211-0.97,0.284c-1.923-0.365-3.919-0.446-6.005-0.211c-3.927,0.438-7.064,2.294-9.37,5.463	c-2.77,3.81-3.422,8.138-2.624,12.653c0.839,4.758,3.267,8.697,6.999,11.778c3.87,3.193,8.328,4.758,13.412,4.458	c3.088-0.178,6.527-0.592,10.405-3.874c0.978,0.486,2.004,0.681,3.707,0.827c1.312,0.122,2.575-0.065,3.553-0.267	c1.532-0.324,1.426-1.743,0.872-2.002c-3.849-1.347-4.4-1.929-4.4-1.929c2.281-2.699,5.72-5.504,7.065-14.59	c0.106-0.721,0.016-1.175,0-1.759c-0.008-0.357,0.073-0.494,0.481-0.535c1.124-0.13,2.216-0.438,3.219-0.989	c2.909-1.589,4.082-4.199,4.359-7.327C50.03,11.207,49.981,10.713,49.475,10.462z M24.126,38.621	c-4.351-3.42-6.461-4.547-7.333-4.499c-0.815,0.049-0.668,0.981-0.489,1.589c0.187,0.6,0.432,1.013,0.774,1.54	c0.236,0.349,0.399,0.867-0.236,1.256c-1.402,0.867-3.838-0.292-3.952-0.349c-2.835-1.67-5.207-3.875-6.877-6.89	c-1.613-2.902-2.55-6.014-2.705-9.338c-0.041-0.802,0.196-1.086,0.994-1.232c1.051-0.195,2.135-0.235,3.186-0.081	c4.441,0.649,8.222,2.634,11.391,5.779c1.809,1.791,3.178,3.931,4.588,6.023c1.499,2.221,3.113,4.337,5.166,6.071	c0.725,0.608,1.304,1.07,1.858,1.41C28.82,40.088,26.033,40.128,24.126,38.621L24.126,38.621z M26.212,25.206	c0-0.357,0.285-0.64,0.644-0.64c0.081,0,0.155,0.016,0.22,0.04c0.09,0.033,0.171,0.081,0.236,0.154	c0.114,0.114,0.179,0.276,0.179,0.446c0,0.357-0.285,0.64-0.644,0.64S26.212,25.562,26.212,25.206L26.212,25.206z M32.69,28.529	c-0.416,0.17-0.831,0.316-1.23,0.332c-0.619,0.032-1.296-0.219-1.662-0.527c-0.57-0.478-0.978-0.746-1.149-1.581	c-0.073-0.357-0.033-0.908,0.033-1.224c0.147-0.681-0.016-1.119-0.497-1.516c-0.391-0.324-0.888-0.413-1.434-0.413	c-0.204,0-0.391-0.089-0.53-0.162c-0.228-0.113-0.415-0.397-0.236-0.746c0.057-0.113,0.334-0.389,0.399-0.438	c0.742-0.422,1.597-0.284,2.387,0.032c0.733,0.3,1.287,0.851,2.086,1.629c0.815,0.94,0.961,1.2,1.426,1.905	c0.367,0.551,0.701,1.119,0.929,1.767C33.35,27.994,33.171,28.327,32.69,28.529L32.69,28.529z"></path>
                    </svg>
                }
            />
            <PoweredCompony
                name="Gemini"
                logo={
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        x="0px"
                        y="0px"
                        width="100"
                        height="100"
                        viewBox="0 0 50 50"
                    >
                        <path d="M49.04,24.001l-1.082-0.043h-0.001C36.134,23.492,26.508,13.866,26.042,2.043L25.999,0.96C25.978,0.424,25.537,0,25,0	s-0.978,0.424-0.999,0.96l-0.043,1.083C23.492,13.866,13.866,23.492,2.042,23.958L0.96,24.001C0.424,24.022,0,24.463,0,25	c0,0.537,0.424,0.978,0.961,0.999l1.082,0.042c11.823,0.467,21.449,10.093,21.915,21.916l0.043,1.083C24.022,49.576,24.463,50,25,50	s0.978-0.424,0.999-0.96l0.043-1.083c0.466-11.823,10.092-21.449,21.915-21.916l1.082-0.042C49.576,25.978,50,25.537,50,25	C50,24.463,49.576,24.022,49.04,24.001z"></path>
                    </svg>
                }
            />
        </div>
    );
}
function PoweredCompony({ name, logo }) {
    return (
        <div className="button-container">
            <div className="brutalist-button openai">
                <div className="openai-logo">{logo}</div>
                <div className="button-text">
                    <span>Powered By</span>
                    <span>{name}</span>
                </div>
            </div>
        </div>
    );
}
