export interface ProjectItem {
	id?: number;
	title: string
	title_en?: string
	description?: string
	date?: string
	detail?: string
  	url?: string
	tags?: string[]
	cover?: string[]
}
export const projectItems: ProjectItem[] = [
	{
		title: "Storm Riders",
    	title_en: "Valentine's Day 3D Assets",
		date: "2023-10-15",
    	detail: "/detail/stormRiders/",
    	url: "https://web.606design.art/landings/004-free-3d-valentines-assets/",
    	cover: ['free-3d-valentines-assets/01.jpg','free-3d-valentines-assets/02.jpg','free-3d-valentines-assets/03.jpg','free-3d-valentines-assets/04.jpg',],
		tags: ['3D', 'WEB', 'ICON']
	},
  {
		title: "the Legend of the Lost Pearl",
    	title_en: "Online Todo List",
		date: "2023-10-15",
    	detail: "/detail/lostPearl",
    	url: "https://www.ricocc.com/todo/",
    	cover: ['cover/cover-todo.jpg'],
		tags: ['WEB', 'UI', 'TODO']
	},
  {
		title: "[示例] Tink 旅行生活日记",
    	title_en: "AI Landing Page",
		date: "2023-10-15",
		url: "https://travellife.zeabur.app/",
		detail: "/detail/tinklife",
    	cover: ['travel/01.jpg','travel/02.jpg','travel/03.jpg','travel/04.jpg'],
		tags: ['WEB', 'MOBILE']
	},

];

