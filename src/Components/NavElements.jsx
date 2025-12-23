import { FaHome, FaRegUserCircle } from 'react-icons/fa';
import { MdOutlineAlternateEmail } from 'react-icons/md';
import { GrProjects } from 'react-icons/gr';
import { SiHyperskill, SiPaloaltonetworks } from 'react-icons/si';

export const NavElements = [
  { id: 1, name: 'home', path: '/', icon: <FaHome /> },
  { id: 2, name: 'about', path: '/about', icon: <FaRegUserCircle /> },
  {
    id: 3,
    name: 'service',
    path: '/services',
    icon: <SiHyperskill />,
  },
  { id: 4, name: 'projects', path: '/projects', icon: <GrProjects /> },
  {
    id: 5,
    name: 'experiences',
    path: '/experiences',
    icon: <SiPaloaltonetworks />,
  },
  {
    id: 6,
    name: 'contact me',
    path: '/contactme',
    icon: <MdOutlineAlternateEmail />,
  },
];
export default NavElements;
