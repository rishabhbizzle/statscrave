import React from 'react'

const PrivacyPage = () => {
    return (
        <div>
            <div className="max-w-3xl mx-auto px-4 py-8">
                <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Information We Collect:</h2>
                    <p className="mb-4">When you use our website and authenticate using Google OAuth and Clerk, we may collect certain personal information provided by Google and Clerk, such as your name, email address, and any other information you choose to share with us.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">How We Use Your Information:</h2>
                    <p className="mb-4">We use the information collected through Google OAuth and Clerk to provide you with access to our services, personalize your experience, and communicate with you about updates and new features. Your information may also be used to improve our services and analyze user behavior.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Data Security:</h2>
                    <p className="mb-4">We take reasonable measures to protect your personal information from unauthorized access, disclosure, alteration, or destruction. We use industry-standard security practices and technologies to safeguard your data.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Third-Party Services:</h2>
                    <p className="mb-4">We use Google OAuth and Clerk for authentication and access control. Your use of Google OAuth and Clerk is subject to their respective privacy policies. We may also use other third-party services to enhance your experience on our website. These services may collect and use your information in accordance with their own privacy policies.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Cookies:</h2>
                    <p className="mb-4">Our website may use cookies to improve your experience and track usage patterns. You can choose to disable cookies in your browser settings, but please note that some features of the website may not function properly as a result.</p>
                </div>

                <div className="mb-8">
                    <h2 className="text-xl font-bold mb-2">Changes to this Privacy Policy:</h2>
                    <p className="mb-4">We reserve the right to update or change this Privacy Policy at any time. Any changes will be posted on this page, and the date of the last update will be indicated at the top of the page.</p>
                </div>

                <div>
                    <h2 className="text-xl font-bold mb-2">Contact Us:</h2>
                    <p className="mb-4">If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at statscrave@gmail.com.</p>
                </div>
            </div>
        </div>
    )
}

export default PrivacyPage