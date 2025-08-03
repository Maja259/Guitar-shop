import React, { useState, useEffect } from "react";
import { useQuery, useLazyQuery } from "@apollo/client";
import {
    Container,
    Row,
    Col,
    Card,
    Spinner,
    Alert,
    Form,
    Navbar,
} from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { FIND_UNIQUE_BRAND } from "../graphql/queries/findUniqueBrand";
import { FIND_BRAND_MODELS } from "../graphql/queries/findBrandModels";
import { SEARCH_MODEL } from "../graphql/queries/searchModels";
import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";

const GuitarModels = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [searchTerm, setSearchTerm] = useState("");
    const [guitarType, setGuitarType] = useState("");
    const [models, setModels] = useState([]);
    const [visibleCount, setVisibleCount] = useState(6);

    const {
        loading: brandLoading,
        error: brandError,
        data: brandData,
    } = useQuery(FIND_UNIQUE_BRAND, {
        variables: { id },
    });

    const {
        loading: modelsLoading,
        error: modelsError,
        data: modelsData,
    } = useQuery(FIND_BRAND_MODELS, {
        variables: {
            id,
            sortBy: { field: "name", order: "ASC" },
        },
    });

    const [searchModels, { data: searchData }] = useLazyQuery(SEARCH_MODEL);

    useEffect(() => {
        if (modelsData && modelsData.findBrandModels) {
            setModels(modelsData.findBrandModels);
        }
    }, [modelsData]);

    useEffect(() => {
        if (searchData && searchData.searchModels) {
            setModels(searchData.searchModels);
        }
    }, [searchData]);

    const handleSearch = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === "") {
            setModels(modelsData.findBrandModels);
        } else {
            searchModels({ variables: { brandId: id, name: value } });
        }
    };

    const handleTypeFilter = (e) => {
        const value = e.target.value;
        setGuitarType(value);

        if (value === "") {
            setModels(modelsData.findBrandModels);
        } else {
            const filtered = modelsData.findBrandModels.filter(
                (m) => m.type.toLowerCase() === value.toLowerCase()
            );
            setModels(filtered);
        }
    };

    const fetchMoreModels = () => {
        setTimeout(() => {
            setVisibleCount((prev) => prev + 4);
        }, 800);
    };

    if (brandLoading || modelsLoading)
        return (
            <div className="text-center mt-5">
                <Spinner animation="border" />
            </div>
        );
    if (brandError || modelsError)
        return <Alert variant="danger">Error loading data</Alert>;

    return (
        <>
            {/* Navbar со копче најлево, логото до него и градиент позадина */}
            <Navbar bg="white" expand="lg" className="py-3 border-bottom position-relative">
                <Container className="d-flex align-items-center justify-content-start gap-3">
                    {/* Копче Back најлево */}
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-link text-dark fw-bold mb-0"
                    >
                        ← Back to Home
                    </button>

                    {/* Логото веднаш до копчето */}
                    <Navbar.Brand className="mb-0">
                        <img src="Logo.svg" alt="Logo" />
                    </Navbar.Brand>
                </Container>

                {/* Сликата со портокалова градиент позадина */}
                <div
                    style={{
                        width: "600px",
                        height: "450px",
                        borderRadius: "0 0 15% 50%",
                        overflow: "hidden",
                        position: "absolute",
                        right: 0,
                        top: 0,
                        background: "linear-gradient(135deg, #FF6428, #ff8a4f)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <img
                        src="heroImage2.png"
                        alt="Hero Guitar"
                        style={{
                            width: "80%",
                            height: "80%",
                            objectFit: "contain",
                        }}
                    />
                </div>
            </Navbar>

            {/* Hero секција */}
            <section className="hero-section py-5">
                <Container>
                    <Row>
                        <Col md={8}>
                            <h1 className="fw-bold display-5 mb-3">
                                Play like a <span style={{ color: "#FF6428" }}>RockStar</span>
                            </h1>
                            <p className="lead text-muted" style={{ fontSize: "1.1rem", lineHeight: "1.6" }}>
                                With a legacy dating back to the 1950s, Ibanez blends expert craftsmanship with
                                cutting-edge innovation to deliver guitars that inspire creativity and elevate your performance.
                                Trusted by top artists worldwide, Ibanez guitars are built to play fast, sound bold,
                                and stand out on any stage.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* Селекција на модели */}
            <Container className="py-5">
                <Row className="mb-5">
                    <Col className="text-center">
                        <h2 className="fw-bold">
                            Check out the <span style={{ color: "#FF6428" }}>Selection</span>
                        </h2>
                    </Col>
                </Row>

                <Row className="mb-4">
                    <Col md={4} sm={6} className="mb-3">
                        <Form.Select value={guitarType} onChange={handleTypeFilter}>
                            <option value="">Filter by type</option>
                            <option value="electric">Electric</option>
                            <option value="acoustic">Acoustic</option>
                            <option value="bass">Bass</option>
                        </Form.Select>
                    </Col>
                    <Col md={{ span: 4, offset: 4 }} sm={6} className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Search by name..."
                            value={searchTerm}
                            onChange={handleSearch}
                        />
                    </Col>
                </Row>

                <InfiniteScroll
                    dataLength={Math.min(visibleCount, models.length)}
                    next={fetchMoreModels}
                    hasMore={visibleCount < models.length}
                    loader={
                        <div className="text-center my-3">
                            <Spinner animation="border" />
                        </div>
                    }
                >
                    <Row>
                        {models.slice(0, visibleCount).map((model) => (
                            <Col md={4} sm={6} xs={12} className="mb-4" key={model.id}>
                                <Card
                                    className="h-100 model-card"
                                    onClick={() => navigate(`/${id}/${model.id}`)}
                                    style={{ cursor: "pointer", border: "none" }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={model.image || "https://via.placeholder.com/300"}
                                        style={{
                                            height: "200px",
                                            objectFit: "contain",
                                            background: "#f9f9f9",
                                        }}
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title>{model.name}</Card.Title>
                                        <Card.Text className="fw-bold text-danger">
                                            ${model.price}
                                        </Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </InfiniteScroll>
            </Container>

            {/* Footer */}
            <footer className="footer-section bg-light pt-5">
                <Container>
                    <Row>
                        <Col md={3} className="mb-3">
                            <img src="Logo.svg" alt="VibeStrings Logo" />
                            <div className="flex items-center gap-2 mt-4">
                                <Mail />
                                <p>Enquiry@VibeStrings.com</p>
                            </div>
                            <div className="flex items-center gap-2 mt-2">
                                <MapPin />
                                <p>San Francisco</p>
                            </div>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold">Pages</h6>
                            <ul className="list-unstyled small">
                                <li><a href="#brands" className="text-muted text-decoration-none">Stores</a></li>
                                <li><a href="#brands" className="text-muted text-decoration-none">Collections</a></li>
                                <li><a href="#brands" className="text-muted text-decoration-none">Support</a></li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold">Product</h6>
                            <ul className="list-unstyled small">
                                <li><a href="#brands" className="text-muted text-decoration-none">Terms</a></li>
                                <li><a href="#brands" className="text-muted text-decoration-none">Privacy policy</a></li>
                                <li><a href="#brands" className="text-muted text-decoration-none">Copyright</a></li>
                            </ul>
                        </Col>
                        <Col md={3} className="mb-3">
                            <h6 className="fw-bold">Follow us</h6>
                            <div className="d-flex gap-3">
                                <Instagram />
                                <Twitter />
                                <Facebook />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="text-center text-muted small py-3 border-top">
                            © 2025 VibeStrings. All rights reserved.
                        </Col>
                    </Row>
                </Container>
            </footer>
        </>
    );
};

export default GuitarModels;
