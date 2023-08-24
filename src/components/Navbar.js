'use client';

import { motion } from 'framer-motion';
import { navVariants } from '@/utils/motion';
import Image from 'next/image';
import Search from '@/assets/search.svg';
import Menu from '@/assets/menu.svg';

const Navbar = () => (
  <motion.nav
    variants={navVariants}
    initial="hidden"
    whileInView="show"
    className="sm:px-16 px-6 py-8 relative"
  >
    <div className="absolute w-[50%] inset-0 gradient-01" />
    <div
      className="lg:w-[80%] w-[100%] mx-auto flex justify-between gap-8"
    >
      <Image
        src={Search}
        alt="search"
        className="w-[24px] h-[24px] object-contain"
      />
      <h2 className="font-extrabold text-[24px] leading-[30.24px] text-white">
        METAVERSUS
      </h2>
      <Image
        src={Menu}
        alt="menu"
        className="w-[24px] h-[24px] object-contain"
      />
    </div>
  </motion.nav>
);

export default Navbar;