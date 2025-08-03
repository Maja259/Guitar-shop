import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Spinner,
    Alert,
    Container,
    Row,
    Col,
    Card,
    Button,
    Navbar,
    Carousel
} from 'react-bootstrap';
import { FIND_UNIQUE_MODELS } from '../graphql/queries/findUniqueModel';
import { Facebook, Instagram, Mail, MapPin, Twitter } from "lucide-react";

const GuitarDetails = () => {
    const { id, guitarId } = useParams();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('specs');

    const { loading, error, data } = useQuery(FIND_UNIQUE_MODELS, {
        variables: { brandId: id, modelId: guitarId }
    });

    if (loading) return <div className="text-center mt-5"><Spinner animation="border" /></div>;
    if (error) return <Alert variant="danger">Error loading guitar details</Alert>;

    const model = data.findUniqueModel;
    if (!model) return <Alert variant="warning">Model not found</Alert>;

    return (
        <div style={{ position: 'relative', minHeight: '100vh' }}>
            {/* Navbar and Hero Section */}
            <div style={{ position: 'relative', paddingBottom: '150px' }}>
                <Navbar bg="white" expand="lg" className="py-3 border-bottom position-relative">
                    <Container className="d-flex align-items-center justify-content-start gap-3">
                        <Button
                            variant="link"
                            className="text-dark mt-3 ms-3 fw-bold"
                            onClick={() => navigate(-1)}
                        >
                            ← Back To List
                        </Button>
                        <Navbar.Brand className="mb-0">
                            <img src="/Logo.svg" alt="VibeStrings Logo" />
                        </Navbar.Brand>
                    </Container>

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
                            src={model.image}
                            alt={model.name}
                            style={{
                                width: "75%",
                                objectFit: "contain",
                                transform: "rotate(-15deg)",
                            }}
                        />
                    </div>
                </Navbar>
            </div>

            <Container className="mt-5 pt-5">
                <div className="d-flex justify-content-start border-bottom mb-4">
                    <button
                        onClick={() => setActiveTab('specs')}
                        className={`btn px-4 py-2 fw-bold ${activeTab === 'specs' ? 'border-bottom border-3 border-danger text-danger' : 'text-muted'}`}
                    >
                        Specification
                    </button>
                    <button
                        onClick={() => setActiveTab('musicians')}
                        className={`btn px-4 py-2 fw-bold ${activeTab === 'musicians' ? 'border-bottom border-3 border-danger text-danger' : 'text-muted'}`}
                    >
                        Who plays it?
                    </button>
                </div>

                {activeTab === 'specs' ? (
                    <>
                        <h2 className="fw-bold mb-3">{model.name}</h2>
                        <p className="mb-4" style={{ maxWidth: "700px" }}>{model.description}</p>
                        <ul className="mt-4" style={{ maxWidth: "600px" }}>
                            <li>Body Wood: {model.specs.bodyWood}</li>
                            <li>Neck Wood: {model.specs.neckWood}</li>
                            <li>Fingerboard: {model.specs.fingerboardWood}</li>
                            <li>Pickups: {model.specs.pickups}</li>
                            <li>Bridge: {model.specs.bridge}</li>
                            <li>Scale Length: {model.specs.scaleLength}</li>
                            <li>Tuners: {model.specs.tuners}</li>
                        </ul>
                    </>
                ) : (
                    <Carousel
                        indicators={false}
                        interval={null}
                        nextIcon={
                            <span
                                className="carousel-control-next-icon"
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px"
                                }}
                            />
                        }
                        prevIcon={
                            <span
                                className="carousel-control-prev-icon"
                                style={{
                                    backgroundColor: "#e0e0e0",
                                    borderRadius: "50%",
                                    width: "30px",
                                    height: "30px"
                                }}
                            />
                        }
                        className="mt-5"
                    >
                        {Array.from({ length: Math.ceil(model.musicians.length / 2) }).map((_, i) => (
                            <Carousel.Item key={i}>
                                <Row className="justify-content-center">
                                    {model.musicians.slice(i * 2, i * 2 + 2).map((musician, index) => (
                                        <Col md={5} sm={6} xs={12} key={index} className="d-flex justify-content-center mb-4">
                                            <Card style={{ width: '18rem' }} className="text-center">
                                                <Card.Img variant="top" src={musician.musicianImage || "/default-musician.jpg"} />
                                                <Card.Body>
                                                    <Card.Title>{musician.name}</Card.Title>
                                                    <Card.Text>{musician.bands}</Card.Text>
                                                </Card.Body>
                                            </Card>
                                        </Col>
                                    ))}
                                </Row>
                            </Carousel.Item>
                        ))}
                    </Carousel>
                )}
            </Container>

            <footer className="footer-section bg-light pt-5 mt-5">
                <Container>
                    <Row>
                        <Col md={3} className="mb-3">
                            <img src="/Logo.svg" alt="VibeStrings Logo" />
                            <div className="d-flex align-items-center gap-2 mt-4">
                                <Mail />
                                <p className="mb-0">Enquiry@VibeStrings.com</p>
                            </div>
                            <div className="d-flex align-items-center gap-2 mt-2">
                                <MapPin />
                                <p className="mb-0">San Francisco</p>
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
        </div>
    );
};

export default GuitarDetails;
