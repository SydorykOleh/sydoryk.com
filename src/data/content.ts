export const siteConfig = {
	siteName: import.meta.env.PUBLIC_SITE_NAME,
	siteUrl: import.meta.env.PUBLIC_SITE_URL,
}

interface NavItem {
	label: string;
	href: string;
	target?: string; // target is optional, defaults to _self or unspecified
}

interface Nav {
	avatar?: string;
	items?: NavItem[]; // Use an array to store navigation items for more flexibility in adding or removing items
}

// Defining navigation items
export const nav: Nav = {
	avatar: '/assets/author.webp',
	items: [
		{ label: 'Portfolio', href: '/', target: '_self' }, // target is '_blank' to open a new link
		//{ label: 'Work', href: '/project', target: '_self' },
		//{ label: 'Blog', href: '/blog', target: '_self' },
		{ label: 'Experience', href: '/experience', target: '_self' },
		{ label: 'About', href: '/about', target: '_self' },
		//{ label: 'Contact', href: '/contact', target: '_self' },
	],
};

// Footer
export const footerText = `© ${new Date().getFullYear()} Sydoryk Oleh. All Rights Reserved.`

//SEO TDK
interface SeoTdk {
	title?: string
	description?: string
	keywords?: string
}
// SEO TDK front page
export const homeTdk: SeoTdk = {
	title: 'Sydoryk Oleh Projects',
	description: 'My projects',
	keywords: 'Sydoryk Oleh, blog'
}
// SEO TDK blog
export const blogTdk: SeoTdk = {
	title: 'Sydoryk Oleh blog',
	description: 'My notes and opinions',
	keywords: 'Sydoryk Oleh, blog'
}
// SEO TDK about
export const aboutTdk: SeoTdk = {
	title: 'About Sydoryk Oleh',
	description: 'Sydoryk Oleh Introduction',
	keywords: 'Sydoryk Oleh, blog'
}
// SEO TDK  项目
export const experienceTdk: SeoTdk = {
	title: 'Sydoryk Oleh Experience',
	description: 'Some of my projects',
	keywords: 'Sydoryk Oleh, blog, project'
}
export const galleryTdk: SeoTdk = {
	title: 'Sydoryk Oleh Gallery',
	description: '3D renderings and animations by Sydoryk Oleh',
	keywords: 'Sydoryk Oleh, gallery, 3d, animation'
}
export const termsTdk: SeoTdk = {
	title: 'Terms and Conditions',
	description: 'Terms and Conditions',
	keywords: 'Sydoryk Oleh, Terms and Conditions'
}
// SEO TDK 404
export const notFoundTdk: SeoTdk = {
	title: '404 Not Found - There is nothing here',
	description: '404 Not Found -There is nothing here',
	keywords: '404 Not Found. There is nothing here'
}

// Social platform name: name url: link icon: svg icon
export const socialLinks = [];

// Page Tag Page header tags Tag
interface PageTag {
	index: string
	about: string
	blog: string
	project: string
	contact: string
	experience: string
	gallery: string
	terms: string
}
export const pageTag: PageTag = {
	index: 'PORTFOLIO',
	about: 'ABOUT',
	blog: 'BLOG',
	project: 'PROJECT',
	contact: 'CONTACT',
	experience: 'EXPERIENCE',
	gallery: 'GALLERY',
	terms: 'Fairplay'
}


// Description text under the page title
interface PageDescription {
	index?: string
	project?: string
	blog?: string
	about?: string
	experience?: string
	contact?: string
	gallery?: string
	terms?: string
}
export const pageDescription: PageDescription = {
	index: "I'm Sydoryk Oleh, a 3D artist. My works below:",
	project: "Some of my projects are shown here",
	about: "I'm Sydoryk Oleh, a creative 3D artist with more than 9 years of experience. You can read more about me here",
	blog: 'My personal notes and thoughts',
	experience: 'My Journey so far',
	gallery: 'Discover a collection of my 3D designs, assets, and animations.',
	terms: 'Friendly legal stuff that protects your vision and my craft.',
	contact: 'Constacts',
}



// FilterItem Home Works Display Filter List
export interface FilterItem {
	content: string
	dataGroup: string
}
export const filterItems: FilterItem[] = [
	{ content: "CGI Movies", dataGroup: "movies" },
	{ content: "Product Animation", dataGroup: "animation" },
	{ content: "Product Stills", dataGroup: "still" },
	//{ content: "Configurator", dataGroup: "configurator" },
];



