import React from 'react';
import { EnvelopeClosedIcon, LinkedInLogoIcon, TwitterLogoIcon, GitHubLogoIcon } from '@radix-ui/react-icons';
import { Button } from './ui/button';
import Link from 'next/link';



const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">ImagineRecruits</h3>
            <p className="text-sm">Revolutionizing job search and recruitment with cutting-edge AI technology.</p>
            <div className="flex space-x-4">
             <Link href="https://github.com/Imagine-hackathon"> <Button variant="link" className="text-imagine-secondary"> <span className="text-sm">GitHub</span></Button> </Link> 
            
              
            </div>
          </div>
          
          
          
          
          
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm">&copy; 2024 ImagineRecruits. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link href="/privacypolicy" className="text-sm hover:text-imagine-blue transition-colors">Privacy Policy</Link>
            <Link href="termsofservice" className="text-sm hover:text-imagine-blue transition-colors">Terms of Service</Link>
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;