import React from "react";

const Footer = () => {
    return (
        <footer className="bg-accent text-white py-8">
            <div className="container mx-auto px-4">

                {/* Logo - Bigger size */}
                <div className="flex-col   justify-center items-center">

                    <div className="flex justify-center items-center">
                    <img
                        src="/logo.png" // Image from the public folder
                        alt="Party Rental Logo"
                        className="h-24 w-auto" // Increase the logo size
                    />
                    </div>


                    <div>

                    <h1 className="text-xl text-center font-semibold">KV Audio</h1>


                    </div>
                   
                </div>





                <div className="mt-6 border-t border-gray-700 pt-6">
                    <div className="flex flex-wrap justify-between">
                        {/* Contact Information */}
                        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
                            <ul>
                                <li>Email: contact@kvaudio.com</li>
                                <li>Phone: +1 234 567 890</li>
                                <li>Address: 123 Katugasthota, Kandy</li>
                            </ul>
                        </div>

                        {/* Services */}
                        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Our Services</h3>
                            <ul>
                                <li>Sound Systes</li>
                                <li>Lighting</li>
                                <li>Furnitures</li>
                                <li>Decorations</li>
                            </ul>
                        </div>

                        {/* Useful Links */}
                        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
                            <ul>
                        
                                <li>
                                    <a href="/home/items" className="hover:text-secondary">Products</a>
                                </li>
                                <li>
                                    <a href="/home/gallery" className="hover:text-secondary">Gallery</a>
                                </li>
                            </ul>
                        </div>

                        {/* Newsletter Subscription */}
                        <div className="w-full sm:w-1/2 md:w-1/4 mb-6">
                            <h3 className="text-lg font-semibold mb-3">Subscribe</h3>
                            <p>Stay updated with the latest party items and special offers!</p>
                            <form className="mt-2">
                                <input
                                    type="email"
                                    placeholder="Your Email"
                                    className="w-full p-2 mt-2 text-black rounded-lg"
                                />
                                <button
                                    type="submit"
                                    className="mt-4 block w-full py-2 font-medium text-center text-white bg-secondary rounded-md hover:bg-white hover:text-secondary  hover:border-secondary  "
                                >
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-bold">
                    <p>&copy; 2025 KV Audio. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
