const weeklyMenu = {
    Monday: {
        breakfastItems: [
            {
                name: "Onion batata poha", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRi0WfqSYRKgWj67l7Ce4oYqTZxM7oPPUorXQ&s"
            },
            {
                name: "Moong dal chilla", img: "https://www.funfoodfrolic.com/wp-content/uploads/2021/08/Dal-Cheela-Thumbnail.jpg"
            },
        ],
        snacksItems: [
            {
                name: "Ragda Pattice", img: "https://shwetainthekitchen.com/wp-content/uploads/2020/05/IMG_8706-scaled.jpg"
            },
            {
                name: "Samosa Pav", img: "https://instamart-media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,h_960,w_960//InstamartAssets/Receipes/samosa_pav.webp"
            },
        ],
        lunch: [
            "Amritsari Chole",
            "Aloo Matar Dry",
            "Bhature",
            "Dal Fry",
            "Peas Pulao",
            "Salad",
            "Roasted Papad",
            "Boondi Raita",
        ],
        dinner: [
            "Matar Chole",
            "Gajar Matar Methi",
            "Chapati",
            "Dal Panchratna",
            "Plain Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: {
            dinner: ["Paneer Butter Masala", "Egg Biryani"],
        },
    },

    Tuesday: {
        breakfastItems: [
            { name: "Sabudana Khichdi", img: "https://images.news18.com/ibnkhabar/uploads/2023/02/sabudana-khichdi.jpg" },
            { name: "Ragi Dosa", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ75UpVrGEaOpAuk2-gIBFll0iMa0Cf5ar-g&s" },
        ],
        snacksItems: [
            { name: "Masala Idli", img: "https://rashmisweets.in/wp-content/uploads/2024/07/Mini-Masala-Idli.png" },
            { name: "Dahi Wada", img: "https://ministryofcurry.com/wp-content/uploads/2016/08/Dahi-Vada-5.jpg" },
        ],
        lunch: [
            "Chana Masala",
            "Gobhi Achaari",
            "Chapati",
            "Dal Tadka",
            "Plain Rice",
            "Salad",
            "Roasted Papad",
            "Curd",
        ],
        dinner: [
            "Aloo Matar",
            "Dry Karela Pyaz",
            "Paratha",
            "Masoor Dal",
            "Tomato Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: [],
    },

    Wednesday: {
        breakfastItems: [
            { name: "Aloo Paneer Paratha", img: "https://www.whiskaffair.com/wp-content/uploads/2022/07/Aloo-Paneer-Paratha-2-3.jpg" },
            { name: "Idli / Medu Vada", img: "https://i.pinimg.com/474x/89/3d/8d/893d8d574c1506d17b2f1cb565453797.jpg", },
        ],
        snacksItems: [
            { name: "Rasam Vada", img: "https://brassy.in/ammachiidlydosai/wp-content/uploads/2023/01/Rasam-vada.jpg" },
            { name: "Veg Hakka Noodles", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2021/07/hakka-noodles-recipe.jpg" },
        ],
        lunch: [
            "Rajma Masala",
            "Bhendi Do Pyaza",
            "Chapati",
            "Black Masoor Dal",
            "Plain Rice",
            "Salad",
            "Roasted Papad",
            "Veg Raita",
        ],
        dinner: [
            "Paneer Kadhai",
            "Lauki Chana Dal",
            "Chapati",
            "Mix Dal",
            "Plain Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: {
            lunch: ["Paneer Biryani", "Chicken Biryani"],
        },
    },

    Thursday: {
        breakfastItems: [
            { name: "Misal Pav", img: "https://www.ohmyveg.co.uk/wp-content/uploads/2023/12/Misal-Pav-2-2-e1722869218662.jpg" },
            { name: "Sevai Upma", img: "https://shwetainthekitchen.com/wp-content/uploads/2021/05/Vermicelli-upma.jpg", },
        ],
        snacksItems: [
            { name: "Bread Pakoda", img: "https://static.toiimg.com/thumb/84629641.cms?imgsize=326457&width=800&height=800" },
            { name: "Dahi Papdi Chat", img: "https://www.whiskaffair.com/wp-content/uploads/2021/03/Dahi-Papdi-Chaat-2-3.jpg" },
        ],
        lunch: [
            "Kashmiri Aloo Dum",
            "Veg Tawa Dry",
            "Puri",
            "Mung Dal Tadka",
            "Lemon Rice",
            "Salad",
            "Roasted Papad",
            "Curd",
        ],
        dinner: [
            "Chana Masala",
            "Parwal / Kundru Dry",
            "Chapati",
            "Veg Moong Dal",
            "Plain Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: {
            dinner: ["Fish Curry", "Egg Tawa Masala"],
        },
    },

    Friday: {
        breakfastItems: [
            { name: "Onion Uttapam", img: "https://rakskitchen.net/wp-content/uploads/2013/03/8527219504_0ddb2cde6f_z-500x500.jpg" },
            { name: "Aloo Onion Paratha", img: "https://5.imimg.com/data5/SELLER/Default/2023/8/334319593/GI/HR/UX/96478487/aloo-pyaz-paratha.jpg" },
        ],
        snacksItems: [
            { name: "Pav Bhaji", img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76z-bgTipPf-E_XzcE3E4h_4eTc8zk1TSSg&s" },
            { name: "Chana Chaat", img: "https://www.madhuseverydayindian.com/wp-content/uploads/2021/05/chana-chaat-with-yogurt.jpg" },
        ],
        lunch: [
            "Creamy Garlic Mushroom",
            "Aloo Barabati",
            "Chapati",
            "Dal Arhar",
            "Plain Rice",
            "Salad",
            "Roasted Papad",
            "Boondi Raita",
        ],
        dinner: [
            "Lauki Kofta",
            "Aloo Soyabean Dry",
            "Chapati",
            "Dal Chana Fry",
            "Fried Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: {
            dinner: ["Chicken Kosha", "Paneer Bhurji"],
        },
    },

    Saturday: {
        breakfastItems: [
            { name: "Puri Bhaji", img: "https://i.ytimg.com/vi/_8HcWaEs8I8/maxresdefault.jpg" },
            { name: "Veg Upma", img: "https://d1uz88p17r663j.cloudfront.net/original/ba32df908435796279e3d79f0d5fbdc1_Rava_Upma_-_Twist.jpg" },
        ],
        snacksItems: [
            { name: "Bhepuri", img: "https://vegecravings.com/wp-content/uploads/2018/06/Bhel-Puri-Recipe-Step-By-Step-Instructions.jpg", },
            { name: "Aloo tikki Chaat", img: "https://www.indianveggiedelight.com/wp-content/uploads/2023/07/aloo-tikki-chaat-featured.jpg" },
        ],
        lunch: [
            "Paneer Tikka Masala",
            "Cabbage Peas Dry",
            "Chapati",
            "Dal Makhani",
            "Plain Rice",
            "Salad",
            "Roasted Papad",
            "Raita",
        ],
        dinner: [
            "Soyabean Chilli",
            "Aloo Palak Saag",
            "Chapati",
            "Dal Kolhapuri",
            "Fried Rice",
            "Salad",
            "Curd",
            "Roasted Papad",
        ],
        specialItems: [],
    },

    Sunday: {
        breakfastItems: [
            {
                name: "Dosa (Cheese, Schezwan, Butter, Gajar & Beet)",
                img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPHyYUdVEjhu_aPxeuNTThFWW9g2m6w02laA&s"
            },
        ],
        snacksItems: [
            { name: "White Sauce Pasta", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2024/04/white-sauce-pasta.jpg" },
            { name: "Tawa Pulao", img: "https://www.indianhealthyrecipes.com/wp-content/uploads/2022/03/tawa-pulao-recipe.jpg" },
        ],
        lunch: [
            "Besan Kadhi Pakoda",
            "Kurkuri Bhindi",
            "Chapati",
            "Masoor Dal",
            "Jeera Rice",
            "Salad",
            "Roasted Papad",
            "Boondi Raita",
        ],
        dinner: [
            "Mixed Veg",
            "Aloo Tamatar Bharta",
            "Chapati",
            "Moong Dal Fry",
            "Dal Khichdi",
            "Salad",
            "Curd",
            "Fryums",
        ],
        specialItems: {
            lunch: ["Butter Chicken", "Paneer 65", "Laccha Paratha"],
        },
    },
};

export default weeklyMenu;
