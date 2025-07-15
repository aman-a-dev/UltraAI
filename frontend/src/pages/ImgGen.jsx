import React, { useState, useRef, useEffect } from "react";
import { MdDownload, MdThumbUp, MdThumbDown, MdRefresh } from "react-icons/md";
import "../css/ImgGen.css";
import Nav from "../components/Nav.jsx";
import Footer from "../components/Footer.jsx";

export default function ImgGen() {
    const [query, setQuery] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [liked, setLiked] = useState(null);
    const [imageUrl, setImageUrl] = useState("");
    const [error, setError] = useState(null);
    const imgRef = useRef(null);

    // Load initial image
    useEffect(() => {
        generate();
        let scrolly = window.scrollY;
        if (scrolly > 0) {
            window.scrollTo({
                top: 0
            });
        }
    }, []);

    function handleSubmit(e) {
        e.preventDefault();
        generate();
    }

    function generate() {
        if (!query.trim()) {
            setError("Please enter a description");
            return;
        }
        if (
            /\b(sex|sexy|fuck|porn|intercorce|vegina|penis|ass|xxx|fucker|naked|nake)\b/i.test(
                query
            )
        ) {
            alert(`You fucken person you asking ${query} for ai fuck you 🖕🏻`);
            return;
        }

        setIsLoading(true);
        setError(null);
        const timestamp = Date.now();
        const newImageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
            query
        )}?width=512&height=512&timestamp=${timestamp}`;

        // Create a new Image object to preload
        const img = new Image();
        img.src = newImageUrl;

        img.onload = () => {
            setImageUrl(newImageUrl);
            setIsLoading(false);
        };

        img.onerror = () => {
            setError(
                "Failed to generate image. Please try a different prompt."
            );
            setIsLoading(false);
        };

        // Set timeout in case the image never loads
        const timeoutId = setTimeout(() => {
            if (isLoading) {
                setError(
                    "Image generation is taking too long. Please try again."
                );
                setIsLoading(false);
            }
        }, 15000);

        return () => clearTimeout(timeoutId);
    }

    return (
        <>
            <Nav />
            <div className="img-gen-container">
                <h1>AI Image Generator</h1>
                <p className="subtitle">
                    Describe what you want to see and let AI create it for you
                </p>

                {error && <div className="error-message">{error}</div>}

                <div className="img-gen-content">
                    <div className="img-box">
                        {isLoading ? (
                            <div className="image-loading">
                                <div className="spinner"></div>
                                <p>Generating your image...</p>
                            </div>
                        ) : imageUrl ? (
                            <>
                                <img
                                    ref={imgRef}
                                    src={imageUrl}
                                    alt={`AI generated image: ${query}`}
                                    onLoad={() => setIsLoading(false)}
                                    onError={() => {
                                        setError(
                                            "Failed to load image. Please try again."
                                        );
                                        setIsLoading(false);
                                    }}
                                />
                                <div className="image-actions">
                                    <button
                                        className={`like-btn ${
                                            liked === true ? "active" : ""
                                        }`}
                                        onClick={() =>
                                            setLiked(
                                                liked === true ? null : true
                                            )
                                        }
                                        title="Like this image"
                                    >
                                        <MdThumbUp />
                                    </button>
                                    <button
                                        className={`dislike-btn ${
                                            liked === false ? "active" : ""
                                        }`}
                                        onClick={() =>
                                            setLiked(
                                                liked === false ? null : false
                                            )
                                        }
                                        title="Dislike this image"
                                    >
                                        <MdThumbDown />
                                    </button>
                                    <a
                                        href={imageUrl}
                                        download
                                        target="_blank"
                                        className="tool"
                                    >
                                        <MdDownload size="20" />
                                    </a>
                                    <span className="tool" onClick={generate}>
                                        <MdRefresh size="20" />
                                    </span>
                                </div>
                            </>
                        ) : (
                            <div className="image-placeholder">
                                <p>Your generated image will appear here</p>
                            </div>
                        )}
                    </div>

                    <form className="prompt-form" onSubmit={handleSubmit}>
                        <textarea
                            value={query}
                            onChange={e => setQuery(e.target.value)}
                            placeholder="Describe the image you want to generate..."
                            rows="5"
                        />
                        <div className="form-actions">
                            <button
                                type="submit"
                                className="generate-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? "Generating..." : "Generate Image"}
                            </button>
                            <div className="character-count">
                                {query.length}/500
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    );
}
