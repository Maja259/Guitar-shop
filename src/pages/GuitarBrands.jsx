import React from 'react';
import { useQuery } from '@apollo/client';
import { Container, Row, Col, Card, Spinner, Alert, Navbar, Nav, Button } from 'react-bootstrap';
import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";
import { Shapes, Truck, Wallet } from "lucide-react";
import { GET_BRANDS } from '../graphql/queries/findAllBrands';
import { useNavigate } from 'react-router-dom';
import './GuitarBrands.css';

const GuitarBrands = () => {
    const navigate = useNavigate();
    const { loading, error, data } = useQuery(GET_BRANDS);

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger" className="mt-4">Error: {error.message}</Alert>;

    return (
        <div>
            {/* NAVBAR */}
            <Navbar bg="white" expand="lg" className="py-3 border-bottom">
                <Container>
                    <Navbar.Brand>
                        <img src="Logo.svg" alt="Logo" />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <div
                            style={{
                                width: "600px",
                                height: "550px",
                                borderRadius: "0 0 15% 50%", // заоблување долу
                                overflow: "hidden",
                                position: "absolute",
                                right: 0,
                                top: 0,
                                backgroundColor: "#f2f2f2",
                            }}
                        >
                            <img
                                src="heroImage.jpg"
                                alt="Hero Guitar"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    objectFit: "cover",
                                    objectPosition: "center",
                                }}
                            />
                        </div>
                        </Navbar.Collapse>
                </Container>
            </Navbar>

            {/* HERO СЕКЦИЈА */}
            <section className="hero-section text-center">
                <Container>
                    <Row className="align-items-center">
                        <Col md={6} className="text-md-start">
                            <h1 className="fw-bold display-5 mb-3 text-center">
                                Browse top quality <span style={{color: "#FF6428"}}>Guitars</span> online
                            </h1>
                            <p className="lead text-muted text-center">
                                Explore 50+ latest collections of branded guitars online with VibeStrings.
                            </p>
                        </Col>
                    </Row>
                </Container>
            </section>

            {/* ЛИСТА НА БРЕНДОВИ */}
            <section id="brands" className="py-5 mt-5">
                <Container>
                    <h2 className="fw-bold text-center mb-5 mt-5">
                        Featuring the <span style={{color: "#FF6428"}}>Best Brands</span>
                    </h2>
                    <p className="text-center mb-5">Select your preferred brand and explore our exquisite collection</p>
                    <Row>
                        {data.findAllBrands.map((brand) => (
                            <Col md={3} sm={6} xs={12} className="mb-4" key={brand.id}>
                                <Card
                                    className="h-100 brand-card"
                                    onClick={() => navigate(`/${brand.id}`)}
                                    style={{ cursor: 'pointer', border: 'none' }}
                                >
                                    <Card.Img
                                        variant="top"
                                        src={brand.image || 'https://via.placeholder.com/300'}
                                        alt={brand.name}
                                        style={{ height: '150px', objectFit: 'contain', background: '#f9f9f9' }}
                                    />
                                    <Card.Body className="text-center">
                                        <Card.Title className="fw-bold">{brand.name}</Card.Title>
                                        <Card.Text className="text-muted">{brand.origin}</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </section>

            <section className="py-5 mt-5 container-fluid bg-dark">
                <div className="text-center">
                    <h4 className="text-light mb-5 fs-2">
                        Why try <span style={{ color: "#FF6428" }}>VibeStrings?</span>
                    </h4>
                </div>

                <Row className="justify-content-center px-5">
                    <Col md={4} className="text-center">
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{ gap: "10px" }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#2b2b2b",
                                    borderRadius: "12px",
                                    padding: "16px",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "60px",
                                    height: "60px",
                                }}
                            >
                                <Shapes color="#FFFFFF" size={28} />
                            </div>
                            <h5 className="text-light mt-2">SMOOTH BROWSING</h5>
                            <p className="text-secondary small">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, officia!
                            </p>
                        </div>
                    </Col>

                    <Col md={4} className="text-center">
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{ gap: "10px" }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#2b2b2b",
                                    borderRadius: "12px",
                                    padding: "16px",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "60px",
                                    height: "60px",
                                }}
                            >
                                <Truck color="#FFFFFF" size={28} />
                            </div>
                            <h5 className="text-light mt-2">EASY DELIVERY</h5>
                            <p className="text-secondary small">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, officia!
                            </p>
                        </div>
                    </Col>

                    <Col md={4} className="text-center">
                        <div
                            className="d-flex flex-column align-items-center"
                            style={{ gap: "10px" }}
                        >
                            <div
                                style={{
                                    backgroundColor: "#2b2b2b",
                                    borderRadius: "12px",
                                    padding: "16px",
                                    display: "inline-flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    width: "60px",
                                    height: "60px",
                                }}
                            >
                                <Wallet color="#FFFFFF" size={28} />
                            </div>
                            <h5 className="text-light mt-2">SWIFT PAYMENT</h5>
                            <p className="text-secondary small">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum, officia!
                            </p>
                        </div>
                    </Col>
                </Row>
            </section>


            <section className="container-fluid py-5" style={{ background: "#fff" }}>
                <div className="container">
                    <Row className="align-items-center">
                        {/* Лева страна: Текст и слика со копчињата */}
                        <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
                            <h2 className="fw-bold mb-3" style={{ fontSize: "2.2rem" }}>
                                Browse and buy your{" "}
                                <span style={{ color: "#FF6428" }}>favorite guitars</span> with <br />
                                VibeStrings.
                            </h2>

                            {/* Слика со копчињата */}
                            <div className="d-flex justify-content-center justify-content-md-start mt-4">
                                <img
                                    src="Stores.png"
                                    alt="Google Play and App Store"
                                    style={{ maxWidth: "250px", height: "auto", cursor: "pointer" }}
                                />
                            </div>
                        </Col>

                        {/* Десна страна: Една слика со телефони и кругот позади */}
                        <Col md={6} className="text-center">
                            <img
                                src="twoPhones.png"
                                alt="Phones with circle background"
                                style={{ maxWidth: "100%", height: "auto" }}
                            />
                        </Col>
                    </Row>
                </div>
            </section>


            {/* FOOTER */}
            <footer className="footer-section bg-light pt-5">
                <Container>
                    <Row>
                        <Col md={3} className="mb-3">
                            {/*<Link href={"/"}>*/}
                                <img src="Logo.svg" alt="VibeStrings Logo" />
                            {/*</Link>*/}
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
                                {/*<i className="bi bi-facebook fs-4 text-muted"></i>*/}
                                {/*<i className="bi bi-twitter fs-4 text-muted"></i>*/}
                                {/*<i className="bi bi-instagram fs-4 text-muted"></i>*/}
                                <Instagram></Instagram>
                                <Twitter></Twitter>
                                <Facebook></Facebook>
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
        </div>
    );
};

export default GuitarBrands;
