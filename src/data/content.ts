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
	avatar:'/assets/author.jpg',
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
	description: 'This is display of Sydoryk Oleh projects',
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
export const socialLinks = [
	{
		name: 'Github',
		url: 'https://github.com/ricocc/public-portfolio-site',
		icon: `<svg t="1730125604816" class="icon ic-github ic-social" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12741" width="256" height="256"><path d="M511.957333 21.333333C241.024 21.333333 21.333333 240.981333 21.333333 512c0 216.832 140.544 400.725333 335.573334 465.664 24.490667 4.394667 32.256-10.069333 32.256-23.082667 0-11.690667 0.256-44.245333 0-85.205333-136.448 29.610667-164.736-64.64-164.736-64.64-22.314667-56.704-54.4-71.765333-54.4-71.765333-44.586667-30.464 3.285333-29.824 3.285333-29.824 49.194667 3.413333 75.178667 50.517333 75.178667 50.517333 43.776 75.008 114.816 53.333333 142.762666 40.789333 4.522667-31.658667 17.152-53.376 31.189334-65.536-108.970667-12.458667-223.488-54.485333-223.488-242.602666 0-53.546667 19.114667-97.322667 50.517333-131.669334-5.034667-12.330667-21.930667-62.293333 4.778667-129.834666 0 0 41.258667-13.184 134.912 50.346666a469.802667 469.802667 0 0 1 122.88-16.554666c41.642667 0.213333 83.626667 5.632 122.88 16.554666 93.653333-63.488 134.784-50.346667 134.784-50.346666 26.752 67.541333 9.898667 117.504 4.864 129.834666 31.402667 34.346667 50.474667 78.122667 50.474666 131.669334 0 188.586667-114.730667 230.016-224.042666 242.090666 17.578667 15.232 33.578667 44.672 33.578666 90.453334v135.850666c0 13.141333 7.936 27.605333 32.853334 22.869334C862.250667 912.597333 1002.666667 728.746667 1002.666667 512 1002.666667 240.981333 783.018667 21.333333 511.957333 21.333333z" p-id="12742"></path></svg>`
	},
	{
	  name: 'Twitter',
	  url: 'https://x.com/ricouii',
		icon: `<svg class="ic-twitter icon" width="1792" height="1792" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"><path d="M1684 408q-67 98-162 167 1 14 1 42 0 130-38 259.5t-115.5 248.5-184.5 210.5-258 146-323 54.5q-271 0-496-145 35 4 78 4 225 0 401-138-105-2-188-64.5t-114-159.5q33 5 61 5 43 0 85-11-112-23-185.5-111.5t-73.5-205.5v-4q68 38 146 41-66-44-105-115t-39-154q0-88 44-163 121 149 294.5 238.5t371.5 99.5q-8-38-8-74 0-134 94.5-228.5t228.5-94.5q140 0 236 102 109-21 205-78-37 115-142 178 93-10 186-50z" fill="#666666"></path></svg>`
	},
	//// RSS 链接不用修改，不想用删除或者注释即可
	//{
	//	name: 'RSS',
	//	url: '/rss.xml',
	//	icon: `<svg t="1730123988138" class="icon ic-rss ic-social " viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="11766" width="256" height="256"><path d="M329.143 768q0 45.714-32 77.714t-77.714 32-77.715-32-32-77.714 32-77.714 77.715-32 77.714 32 32 77.714z m292.571 70.286q1.143 16-9.714 27.428-10.286 12-26.857 12H508q-14.286 0-24.571-9.428T472 844.57q-12.571-130.857-105.429-223.714T142.857 515.43q-14.286-1.143-23.714-11.429t-9.429-24.571v-77.143q0-16.572 12-26.857 9.715-9.715 24.572-9.715h2.857q91.428 7.429 174.857 46T472 515.43q65.143 64.571 103.714 148t46 174.857z m292.572 1.143q1.143 15.428-10.286 26.857-10.286 11.428-26.286 11.428H796q-14.857 0-25.429-10T759.43 843.43Q752.57 720.57 701.714 610T569.43 418t-192-132.286T144 227.43q-14.286-0.572-24.286-11.143t-10-24.857v-81.715q0-16 11.429-26.285 10.286-10.286 25.143-10.286H148q149.714 7.428 286.571 68.571t243.143 168q106.857 106.286 168 243.143t68.572 286.572z" p-id="11767"></path></svg>`
	//},
	//{
	//  name: 'Behance',
	//  url: 'https://www.behance.net/ricochan/',
	//  icon: `<svg class="ic-behance ic-social" width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
	//	<g clip-path="url(#clip0_1771_115)">
	//	<path fill-rule="evenodd" clip-rule="evenodd" d="M6.71692 14.0126C6.41937 14.1494 6.00062 14.2186 5.46449 14.2186H2.46336V11.0969H5.50708C6.03611 11.1017 6.44885 11.1682 6.74258 11.2951C7.26834 11.5236 7.52931 11.9413 7.52931 12.5514C7.52931 13.271 7.25906 13.7563 6.71692 14.0126ZM2.46336 6.57746H5.15439C5.74566 6.57746 6.23266 6.63878 6.61592 6.76037C7.05814 6.93648 7.27926 7.29602 7.27926 7.84268C7.27926 8.33273 7.1111 8.67551 6.77698 8.86944C6.44067 9.06336 6.00445 9.16032 5.46941 9.16032H2.46336V6.57746ZM8.22813 9.96904C8.85817 10.1871 9.33315 10.5309 9.6569 11.0021C9.97683 11.4722 10.1379 12.0446 10.1379 12.7175C10.1379 13.4115 9.95445 14.0341 9.58593 14.5839C9.35335 14.9482 9.06181 15.2558 8.7113 15.5048C8.31767 15.7915 7.85306 15.9859 7.31529 16.0929C6.77807 16.1987 6.19717 16.2501 5.56932 16.2501H0V4.54544H5.97278C7.48017 4.56641 8.54697 4.98203 9.17591 5.79232C9.55317 6.29024 9.74262 6.88511 9.74262 7.57905C9.74262 8.29238 9.55317 8.86839 9.171 9.30288C8.95699 9.54555 8.64306 9.7683 8.22813 9.96904ZM12.7798 6.54758V5.09105H18.0762V6.54758H12.7798ZM19.1874 9.05104C19.5652 9.56573 19.8076 10.1627 19.9179 10.8409C19.9828 11.2371 20.0085 11.8121 19.9976 12.5595H13.3385C13.3784 13.4269 13.6934 14.036 14.2961 14.385C14.6603 14.602 15.0992 14.711 15.6141 14.711C16.1562 14.711 16.5995 14.5784 16.9391 14.3143C17.1264 14.1707 17.2907 13.9725 17.4321 13.7189H19.872C19.8076 14.2309 19.5111 14.7535 18.9865 15.2834C18.1681 16.124 17.0215 16.5454 15.548 16.5454C14.3311 16.5454 13.2577 16.1911 12.3296 15.4804C11.3971 14.7713 10.9336 13.6151 10.9336 12.0155C10.9336 10.5154 11.3534 9.36499 12.192 8.56466C13.0328 7.7659 14.1203 7.3639 15.4601 7.3639C16.2561 7.3639 16.9719 7.49965 17.6095 7.77009C18.2483 8.04001 18.7735 8.4677 19.1874 9.05104ZM13.3975 11.0658H17.5167C17.4731 10.4646 17.259 10.0102 16.8801 9.69728C16.4969 9.38648 16.0252 9.23134 15.4612 9.23134C14.8497 9.23134 14.372 9.39644 14.0346 9.72611C13.6972 10.0558 13.4843 10.5023 13.3975 11.0658Z" fill=""></path>
	//	</g>
	//	<defs>
	//	<clipPath id="clip0_1771_115">
	//	<rect width="20" height="20" fill="white"></rect>
	//	</clipPath>
	//	</defs>
	//  </svg>`
	//},
	//{
	//  name: 'Dribbble',
	//  url: 'https://dribbble.com/rrrricocc/',
	//  icon: `<svg t="1713088758234" class="ic-dribbble ic-social icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4274" width="20" height="20"><path d="M626.645333 512.981333a1905.493333 1905.493333 0 0 1 88.149334 273.621334A340.864 340.864 0 0 0 853.333333 512c0-77.226667-25.6-148.437333-68.864-205.610667a894.848 894.848 0 0 1-194.346666 122.794667 1909.12 1909.12 0 0 1 23.04 51.498667 557.226667 557.226667 0 0 1 239.018666 3.242666 345.941333 345.941333 0 0 1-3.925333 86.997334A468.778667 468.778667 0 0 0 725.333333 554.666667c-26.965333 0-53.632 2.261333-79.701333 6.741333-6.101333-16.213333-12.416-32.384-18.986667-48.426667z m-79.018666 32.213334a1823.872 1823.872 0 0 0-36.650667-83.84A895.786667 895.786667 0 0 1 170.666667 511.018667V512a341.333333 341.333333 0 0 0 466.56 317.653333 1820.16 1820.16 0 0 0-74.453334-246.101333 466.816 466.816 0 0 0-111.232 59.221333 471.893333 471.893333 0 0 0-134.4 149.504 343.253333 343.253333 0 0 1-64.597333-58.453333 557.354667 557.354667 0 0 1 277.930667-229.290667c5.888 13.482667 11.605333 27.008 17.152 40.661334z m-366.08-119.125334a810.837333 810.837333 0 0 0 291.157333-41.770666 1834.069333 1834.069333 0 0 0-108.373333-180.138667 342.101333 342.101333 0 0 0-182.741334 221.866667z m543.189333-181.034666A339.882667 339.882667 0 0 0 512 170.666667c-21.674667 0-42.88 2.005333-63.402667 5.888a1918.634667 1918.634667 0 0 1 103.850667 176.042666 809.216 809.216 0 0 0 172.288-107.52zM512 938.666667C276.352 938.666667 85.333333 747.648 85.333333 512S276.352 85.333333 512 85.333333s426.666667 191.018667 426.666667 426.666667-191.018667 426.666667-426.666667 426.666667z" fill="" p-id="4275"></path></svg>`
	//},
	//{
	//  name: 'Bilibili',
	//  url: 'https://space.bilibili.com/11442751',
	//  icon: `<svg class="ic-bilibili ic-social" width="20" height="20" viewBox="0 0 20 20" fill="" xmlns="http://www.w3.org/2000/svg">
	//	<path fill-rule="evenodd" clip-rule="evenodd" d="M4.73252 3.67094C4.33229 3.28484 4.33229 2.64373 4.73252 2.25764C5.11291 1.89068 5.71552 1.89068 6.09591 2.25764L8.21723 4.30403C8.27749 4.36218 8.32869 4.4261 8.37081 4.49407H11.5789C11.6211 4.4261 11.6723 4.36218 11.7325 4.30403L13.8538 2.25764C14.2342 1.89068 14.8368 1.89068 15.2172 2.25764C15.6175 2.64373 15.6175 3.28484 15.2172 3.67094L14.364 4.49407H15C17.2091 4.49407 19 6.28493 19 8.49407V13.9996C19 16.2087 17.2091 17.9996 15 17.9996H5C2.79086 17.9996 1 16.2087 1 13.9996V8.49406C1 6.28492 2.79086 4.49407 5 4.49407H5.58579L4.73252 3.67094ZM5 6.42343C3.89543 6.42343 3 7.31886 3 8.42343V14.0702C3 15.1748 3.89543 16.0702 5 16.0702H15C16.1046 16.0702 17 15.1748 17 14.0702V8.42343C17 7.31886 16.1046 6.42343 15 6.42343H5ZM6 10.3175C6 9.76519 6.44772 9.31747 7 9.31747C7.55228 9.31747 8 9.76519 8 10.3175V11.2115C8 11.7638 7.55228 12.2115 7 12.2115C6.44772 12.2115 6 11.7638 6 11.2115V10.3175ZM13 9.31747C12.4477 9.31747 12 9.76519 12 10.3175V11.2115C12 11.7638 12.4477 12.2115 13 12.2115C13.5523 12.2115 14 11.7638 14 11.2115V10.3175C14 9.76519 13.5523 9.31747 13 9.31747Z"></path>
	//  </svg>`
	//},
];

// Page Tag Page header tags Tag
interface PageTag {
	index: string
	about: string
	blog: string
	project: string
	contact: string
	experience: string
	terms: string
}
export const pageTag: PageTag = {
	index: 'PORTFOLIO',
	about: 'ABOUT',
	blog: 'BLOG',
	project: 'PROJECT',
	contact: 'CONTACT',
	experience: 'EXPERIENCE',
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
	terms?: string
}
export const pageDescription: PageDescription = {
	index: "I'm Sydoryk Oleh, a creative 3D artist with more than 9 years of experience. You can see some of my projects here",
	project: "Some of my projects are shown here",
	about: "I'm Sydoryk Oleh, a creative 3D artist with more than 9 years of experience. You can read more about me here",
	blog: 'My personal notes and thoughts',
	experience: 'My Journey so far',
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
];



