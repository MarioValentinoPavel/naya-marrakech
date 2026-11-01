// Datos reales de NAYA (Google Business, Instagram, TikTok y su carta en cartenaya.netlify.app, consultados el 2026-11-01).
// Los nombres de los platos se quedan como en su carta; las descripciones EN/ES son traducciones nuestras.
window.SHOP = {
  name: 'NAYA',
  street: 'Rue Hassania', district: 'Guéliz', city: 'Marrakech', zip: '40000',
  lat: 31.6348099, lng: -8.008524, plus: 'JXMR+WH Marrakech',
  tel: '+212715479227', telLabel: '07 15 47 92 27',
  open: 9 * 60, close: 24 * 60, tz: 'Africa/Casablanca',
  rating: '4,7', reviews: 50,
  ig: 'https://www.instagram.com/naya.marrakech/',
  tiktok: 'https://www.tiktok.com/@naya.marrakech',
  glovo: 'https://glovoapp.com/ma/fr/marrakech/naya-mar',
  maps: 'https://www.google.com/maps/place/Naya+-+Brunch+%26+Dessert+Marrakech/@31.6348099,-8.008524,17z/data=!4m6!3m5!1s0xdafef5b10dc935b:0xccee9c8a0549a805!8m2!3d31.6348099!4d-8.008524',
  dir: 'https://www.google.com/maps/dir/?api=1&destination=31.6348099,-8.008524'
};

// Carta. side: lado de la mesa (salé a la izquierda, sucré a la derecha). img: foto cenital de su carta.
window.MENU = [
  { id: 'brunch', title: { fr: 'Côté Brunch', en: 'Brunch', es: 'Brunch' }, items: [
    { id: 'toast-signature', n: 'Toast Signature', p: 230, side: 'sale', img: 'toast-signature', d: {
      fr: 'Toast garni d’emmental, oignons confits, entrecôte de 200 g et sauce forestière.',
      en: 'Toast topped with Emmental, caramelised onions, a 200 g rib-eye and forestière mushroom sauce.',
      es: 'Tostada con emmental, cebolla confitada, 200 g de entrecot y salsa forestière de setas.' } },
    { id: 'avocado-salmon-toast', n: 'Avocado Salmon Toast', p: 125, side: 'sale', img: 'avocado-salmon-toast', d: {
      fr: 'Pain grillé garni de cream cheese, saumon fumé, avocat et ciboulette.',
      en: 'Toasted bread with cream cheese, smoked salmon, avocado and chives.',
      es: 'Pan tostado con queso crema, salmón ahumado, aguacate y cebollino.' } },
    { id: 'pan-benedict-bacon', n: 'Pan Benedict Bacon', p: 120, side: 'sale', d: {
      fr: 'Pancakes garnis d’avocat, bacon, œuf poché et une sauce hollandaise.',
      en: 'Pancakes topped with avocado, bacon, a poached egg and hollandaise sauce.',
      es: 'Tortitas con aguacate, bacon, huevo poché y salsa holandesa.' } },
    { id: 'pan-benedict-saumon', n: 'Pan Benedict Saumon', p: 110, side: 'sale', d: {
      fr: 'Pancakes garnis d’avocat, saumon fumé, œuf poché et une sauce hollandaise.',
      en: 'Pancakes topped with avocado, smoked salmon, a poached egg and hollandaise sauce.',
      es: 'Tortitas con aguacate, salmón ahumado, huevo poché y salsa holandesa.' } },
    { id: 'madame-naya', n: 'Madame NAYA', p: 100, side: 'sale', img: 'madame-naya', d: {
      fr: 'Pain de mie toasté, béchamel truffée, jambon de dinde suprême, emmental, œuf au plat et copeaux de truffe.',
      en: 'Toasted sandwich bread, truffle béchamel, turkey ham, Emmental, a fried egg and truffle shavings.',
      es: 'Pan de molde tostado, bechamel trufada, jamón de pavo, emmental, huevo frito y láminas de trufa.' } },
    { id: 'morning-crunch', n: 'Morning Crunch', p: 150, side: 'sale', img: 'morning-crunch', d: {
      fr: 'Burger au poulet crispy, bacon grillé, cheddar fondant, salade fraîche, mayonnaise spicy et confit d’oignons.',
      en: 'Crispy chicken burger, grilled bacon, melted cheddar, fresh salad, spicy mayo and onion confit.',
      es: 'Hamburguesa de pollo crujiente, bacon a la plancha, cheddar fundido, ensalada, mayonesa picante y cebolla confitada.' } },
    { id: 'brioche-effilochee', n: 'Brioche Effilochée', p: 150, side: 'sale', img: 'brioche-effilochee', d: {
      fr: 'Toast brioché garni de bœuf effiloché, guacamole et cheddar fondu.',
      en: 'Toasted brioche with pulled beef, guacamole and melted cheddar.',
      es: 'Brioche tostado con ternera deshilachada, guacamole y cheddar fundido.' } },
    { id: 'burrata-naya', n: 'Burrata NAYA', p: 140, side: 'sale', img: 'burrata-naya', d: {
      fr: 'Tomates de saison, burrata crémeuse et pêche, sublimées par une crème balsamique et un filet d’huile d’olive.',
      en: 'Seasonal tomatoes, creamy burrata and peach, with balsamic cream and a drizzle of olive oil.',
      es: 'Tomates de temporada, burrata cremosa y melocotón, con crema balsámica y un hilo de aceite de oliva.' } },
    { id: 'salade-cesar', n: 'Salade César', p: 130, side: 'sale', img: 'salade-cesar', d: {
      fr: 'Romaine, poulet pané croustillant, croûtons, copeaux de parmesan, tomates cerises et sauce César maison, relevée d’un trait de vinaigre balsamique.',
      en: 'Romaine, crispy breaded chicken, croutons, parmesan shavings, cherry tomatoes and homemade Caesar dressing with a dash of balsamic.',
      es: 'Romana, pollo empanado crujiente, picatostes, lascas de parmesano, tomates cherry y salsa César casera con un toque de balsámico.' } },
    { id: 'le-beldi', n: 'Le Beldi', p: 80, side: 'sale', img: 'le-beldi', d: {
      fr: 'Msemen, baghrir et harcha, une boisson froide et une boisson chaude, avec miel, amlou, beurre, confiture de fraise et Nutella.',
      en: 'Msemen, baghrir and harcha, one cold drink and one hot drink, with honey, amlou, butter, strawberry jam and Nutella.',
      es: 'Msemen, baghrir y harcha, una bebida fría y una caliente, con miel, amlou, mantequilla, mermelada de fresa y Nutella.' } }
  ], eggs: {
    title: { fr: 'Œufs & Omelettes', en: 'Eggs & omelettes', es: 'Huevos y tortillas' },
    note: { fr: 'Toutes nos omelettes et brouillades d’œuf sont servies avec de la salade.', en: 'All our omelettes and scrambled eggs are served with salad.', es: 'Todas nuestras tortillas y huevos revueltos se sirven con ensalada.' },
    items: [
      { id: 'omelette-nature', n: { fr: 'Omelette nature', en: 'Plain omelette', es: 'Tortilla francesa' }, p: 25, side: 'sale' },
      { id: 'omelette-fromage', n: { fr: 'Omelette au fromage', en: 'Cheese omelette', es: 'Tortilla de queso' }, p: 30, side: 'sale' },
      { id: 'omelette-champignons', n: { fr: 'Omelette aux champignons de Paris', en: 'Button mushroom omelette', es: 'Tortilla de champiñones' }, p: 40, side: 'sale' },
      { id: 'brouillade-nature', n: { fr: 'Brouillade d’œuf nature', en: 'Plain scrambled eggs', es: 'Huevos revueltos' }, p: 30, side: 'sale' },
      { id: 'brouillade-truffe', n: { fr: 'Brouillade d’œuf à la crème de truffe', en: 'Scrambled eggs with truffle cream', es: 'Huevos revueltos con crema de trufa' }, p: 55, side: 'sale' }
    ] } },
  { id: 'brasserie', title: { fr: 'Côté Brasserie', en: 'Brasserie', es: 'Brasserie' }, items: [
    { id: 'entrecote-sauce-verte', n: 'Entrecôte Sauce Verte', p: 240, side: 'sale', img: 'entrecote-sauce-verte', star: true, d: {
      fr: 'L’incontournable de la maison. Entrecôte tendre grillée, servie avec notre sauce signature, frites croustillantes et salade fraîche.',
      en: 'The house classic. Tender grilled rib-eye with our signature sauce, crispy fries and a fresh salad.',
      es: 'El imprescindible de la casa. Entrecot tierno a la parrilla con nuestra salsa de la casa, patatas crujientes y ensalada fresca.' } },
    { id: 'linguine-truffe', n: 'Linguine à la Truffe', p: 175, side: 'sale', img: 'linguine-truffe', d: {
      fr: 'Linguine à la crème de truffe noire, copeaux de truffe et parmesan râpé.',
      en: 'Linguine in black truffle cream with truffle shavings and grated parmesan.',
      es: 'Linguine con crema de trufa negra, láminas de trufa y parmesano rallado.' } },
    { id: 'penne-salmon', n: 'Penne Salmon', p: 150, side: 'sale', img: 'penne-salmon', d: {
      fr: 'Penne à la crème, saumon, tomates cerises et parmesan râpé.',
      en: 'Penne in cream sauce with salmon, cherry tomatoes and grated parmesan.',
      es: 'Penne a la crema con salmón, tomates cherry y parmesano rallado.' } },
    { id: 'penne-chicken-alfredo', n: 'Penne Chicken Alfredo', p: 140, side: 'sale', d: {
      fr: 'Penne à la crème, champignons de Paris, émincés de filet de poulet et parmesan râpé.',
      en: 'Penne in cream sauce with button mushrooms, sliced chicken fillet and grated parmesan.',
      es: 'Penne a la crema con champiñones, tiras de pechuga de pollo y parmesano rallado.' } },
    { id: 'burger-gourmet', n: 'Burger Gourmet', p: 160, side: 'sale', img: 'burger-gourmet', d: {
      fr: 'Steak haché boucher de 150 g, cheddar et confit d’oignon, servi avec sa sauce cheddar et des frites.',
      en: 'A 150 g butcher’s beef patty, cheddar and onion confit, served with cheddar sauce and fries.',
      es: '150 g de carne picada de carnicero, cheddar y cebolla confitada, con su salsa de cheddar y patatas fritas.' } },
    { id: 'saltimbocca-boursin', n: 'Saltimbocca Boursin', p: 140, side: 'sale', img: 'saltimbocca-boursin', d: {
      fr: 'Escalope gratinée garnie de jambon, Boursin et mozzarella. Frites ou pâtes, au choix.',
      en: 'Gratinated escalope with ham, Boursin and mozzarella. Fries or pasta, your choice.',
      es: 'Escalope gratinado con jamón, Boursin y mozzarella. Patatas fritas o pasta, a elegir.' } },
    { id: 'saltimbocca-chevre-miel', n: 'Saltimbocca Chèvre & Miel', p: 150, side: 'sale', img: 'saltimbocca-chevre-miel', d: {
      fr: 'Escalope gratinée garnie de jambon, chèvre, mozzarella et miel. Frites ou pâtes, au choix.',
      en: 'Gratinated escalope with ham, goat’s cheese, mozzarella and honey. Fries or pasta, your choice.',
      es: 'Escalope gratinado con jamón, queso de cabra, mozzarella y miel. Patatas fritas o pasta, a elegir.' } }
  ], extra: { id: 'extra-frites-pates', n: { fr: 'Extra frites ou pâtes', en: 'Extra fries or pasta', es: 'Extra de patatas o pasta' }, p: 35, side: 'sale' } },
  { id: 'desserts', title: { fr: 'Côté Desserts', en: 'Desserts', es: 'Postres' }, items: [
    { id: 'mango-taco', n: 'Mango Taco', p: 100, side: 'sucre', img: 'mango-taco', d: {
      fr: 'Pancake moelleux garni d’une chantilly au zeste de citron vert, coulis mangue-passion et mangue fraîche.',
      en: 'Fluffy pancake with lime-zest whipped cream, mango-passion coulis and fresh mango.',
      es: 'Tortita esponjosa con nata a la ralladura de lima, coulis de mango y maracuyá y mango fresco.' } },
    { id: 'white-pistachio-cookie', n: 'White Pistachio Cookie', p: 100, side: 'sucre', img: 'white-pistachio-cookie', d: {
      fr: 'Cookie mi-cuit à la pistache et au chocolat blanc, framboises fraîches et boule de glace vanille.',
      en: 'Half-baked pistachio and white chocolate cookie, fresh raspberries and a scoop of vanilla ice cream.',
      es: 'Cookie semicocida de pistacho y chocolate blanco, frambuesas frescas y una bola de helado de vainilla.' } },
    { id: 'fondant-nutella', n: 'Fondant Nutella', p: 80, side: 'sucre', img: 'fondant-nutella', d: {
      fr: 'Fondant au Nutella servi avec une boule de glace vanille.',
      en: 'Nutella fondant with a scoop of vanilla ice cream.',
      es: 'Coulant de Nutella con una bola de helado de vainilla.' } },
    { id: 'waffle-love', n: 'Waffle Love', p: 80, side: 'sucre', d: {
      fr: 'Gaufres en forme de cœur, avec un coulis au choix : Nutella, miel, caramel au beurre salé ou sirop d’érable.',
      en: 'Heart-shaped waffles with your choice of Nutella, honey, salted butter caramel or maple syrup.',
      es: 'Gofres en forma de corazón con Nutella, miel, caramelo de mantequilla salada o sirope de arce, a elegir.' } },
    { id: 'muesli-exotique', n: 'Muesli Exotique', p: 80, side: 'sucre', img: 'muesli-exotique', d: {
      fr: 'Fromage blanc, granola aux noisettes et coulis mangue-passion.',
      en: 'Fromage blanc, hazelnut granola and mango-passion coulis.',
      es: 'Queso fresco batido, granola de avellanas y coulis de mango y maracuyá.' } },
    { id: 'muesli-fruits-rouges', n: 'Muesli Fruits Rouges', p: 80, side: 'sucre', img: 'muesli-fruits-rouges', d: {
      fr: 'Fromage blanc, granola aux noisettes, framboise, myrtille, mûre et coulis fruits rouges.',
      en: 'Fromage blanc, hazelnut granola, raspberry, blueberry, blackberry and red berry coulis.',
      es: 'Queso fresco batido, granola de avellanas, frambuesa, arándano, mora y coulis de frutos rojos.' } },
    { id: 'brioche-perdue', n: 'Brioche Perdue', p: 90, side: 'sucre', img: 'brioche-perdue', d: {
      fr: 'Brioche perdue avec un coulis au choix : Nutella, miel, caramel au beurre salé ou sirop d’érable.',
      en: 'Brioche French toast with your choice of Nutella, honey, salted butter caramel or maple syrup.',
      es: 'Torrija de brioche con Nutella, miel, caramelo de mantequilla salada o sirope de arce, a elegir.' } },
    { id: 'trio-pancake', n: 'Trio de Pancake', p: 80, side: 'sucre', img: 'trio-pancake', d: {
      fr: 'Trois pancakes avec un coulis au choix : Nutella, miel, caramel au beurre salé ou sirop d’érable.',
      en: 'Three pancakes with your choice of Nutella, honey, salted butter caramel or maple syrup.',
      es: 'Tres tortitas con Nutella, miel, caramelo de mantequilla salada o sirope de arce, a elegir.' } },
    { id: 'duo-pancake-gourmand', n: 'Duo de Pancake Gourmand', p: 90, side: 'sucre', img: 'duo-pancake-gourmand', d: {
      fr: 'Deux pancakes, chantilly maison à la vanille, noix de pécan, caramel au beurre salé et éclats de spéculos.',
      en: 'Two pancakes, homemade vanilla whipped cream, pecans, salted butter caramel and speculoos crumbs.',
      es: 'Dos tortitas, nata casera a la vainilla, nueces pecanas, caramelo de mantequilla salada y trocitos de speculoos.' } },
    { id: 'patisserie-du-jour', n: 'Pâtisserie du Jour', p: 80, side: 'sucre', img: 'patisserie-du-jour', d: {
      fr: 'Pâtisseries et desserts faits maison, mis en vitrine chaque jour.',
      en: 'Homemade pastries and desserts, in the display case every day.',
      es: 'Pasteles y postres caseros, en la vitrina cada día.' } }
  ] }
];

// Bebidas: c = color aproximado de la bebida para su muestra (dos colores = bebida en dos capas).
window.DRINKS = [
  { id: 'chaudes', title: { fr: 'Boissons chaudes', en: 'Hot drinks', es: 'Bebidas calientes' }, items: [
    { id: 'expresso', n: 'Expresso', p: 20, c: ['#3b2216'] },
    { id: 'macchiato', n: 'Macchiato', p: 25, c: ['#4a2c1c', '#efe4d2'] },
    { id: 'latte-macchiato', n: 'Latte Macchiato', p: 30, c: ['#d9c3a3'] },
    { id: 'iced-latte', n: 'Iced Latte', p: 35, c: ['#cdb08a'] },
    { id: 'iced-caramel-macchiato', n: 'Iced Caramel Macchiato', p: 40, c: ['#e8d7bd', '#c58a4f'] },
    { id: 'caramel-macchiato', n: 'Caramel Macchiato', p: 40, c: ['#b8783f'] },
    { id: 'cappuccino', n: 'Cappuccino', p: 30, c: ['#a97c58'] },
    { id: 'spanish-latte', n: 'Spanish Latte', p: 40, c: ['#c89e72'] },
    { id: 'chocolat-chaud', n: { fr: 'Chocolat chaud', en: 'Hot chocolate', es: 'Chocolate caliente' }, p: 35, c: ['#5a3322'] },
    { id: 'chocolat-viennois', n: { fr: 'Chocolat viennois', en: 'Viennese hot chocolate', es: 'Chocolate vienés' }, p: 45, c: ['#5a3322', '#f3ece0'] },
    { id: 'the-menthe', n: { fr: 'Thé à la menthe traditionnelle', en: 'Traditional mint tea', es: 'Té a la menta tradicional' }, p: 25, c: ['#b98a2e'] },
    { id: 'the-lait', n: { fr: 'Thé au lait', en: 'Tea with milk', es: 'Té con leche' }, p: 30, c: ['#c9a27c'] },
    { id: 'vanilla-matcha-latte', n: 'Vanilla Matcha Latte', p: 50, c: ['#9db46a'] },
    { id: 'iced-matcha-latte', n: 'Iced Matcha Latte', p: 45, c: ['#86a650'] },
    { id: 'strawberry-matcha', n: 'Strawberry Matcha', p: 60, c: ['#e98c97', '#7f9f45'] },
    { id: 'mango-matcha', n: 'Mango Matcha', p: 60, c: ['#f2a63a', '#7f9f45'] },
    { id: 'passion-matcha', n: 'Passion Matcha', p: 60, c: ['#e9b23c', '#7f9f45'] }
  ] },
  { id: 'fraiches', title: { fr: 'Boissons fraîches', en: 'Cold drinks', es: 'Bebidas frías' }, items: [
    { id: 'jus-orange', n: { fr: 'Jus d’orange pressé', en: 'Fresh orange juice', es: 'Zumo de naranja natural' }, p: 25, c: ['#f08a1c'] },
    { id: 'citronnade', n: { fr: 'Citronnade', en: 'Lemonade', es: 'Limonada' }, p: 30, c: ['#ecd56a'] },
    { id: 'jus-avocat', n: { fr: 'Jus d’avocat', en: 'Avocado juice', es: 'Zumo de aguacate' }, p: 35, c: ['#a9bd6a'] },
    { id: 'coca-cola', n: 'Coca-Cola 33 cl', p: 25, c: ['#2e1a14'] },
    { id: 'coca-zero', n: 'Coca Zéro 33 cl', p: 25, c: ['#2e1a14'] },
    { id: 'coca-cherry', n: 'Coca Cherry 33 cl', p: 30, c: ['#3a1618'] },
    { id: 'hawai', n: 'Hawaï 33 cl', p: 25, c: ['#f4b13c'] },
    { id: 'fanta-orange', n: 'Fanta Orange 33 cl', p: 30, c: ['#f5891f'] },
    { id: 'fanta-citron', n: 'Fanta Citron 33 cl', p: 30, c: ['#e8dd7a'] },
    { id: 'oulmes', n: 'Oulmès 33 cl', p: 20, c: ['#d6dfdc'] },
    { id: 'eau', n: { fr: 'Bouteille d’eau 33 cl', en: 'Bottle of water 33 cl', es: 'Botella de agua 33 cl' }, p: 15, c: ['#e3e8e6'] }
  ] },
  { id: 'cocktails', title: { fr: 'Cocktails signature', en: 'Signature cocktails', es: 'Cócteles de la casa' }, items: [
    { id: 'red-sunset', n: 'Red Sunset', p: 65, c: ['#c4313d', '#f08a2c'], i: { fr: 'Ananas · fruits rouges · pêche · orange', en: 'Pineapple · red berries · peach · orange', es: 'Piña · frutos rojos · melocotón · naranja' } },
    { id: 'tropical-breeze', n: 'Tropical Breeze', p: 65, c: ['#e2465a', '#f3a03a'], i: { fr: 'Orange · ananas · fraise', en: 'Orange · pineapple · strawberry', es: 'Naranja · piña · fresa' } },
    { id: 'passion-paradise', n: 'Passion Paradise', p: 65, c: ['#e45f6b', '#f2b84b'], i: { fr: 'Pêche · fraise · melon · fruit de la passion', en: 'Peach · strawberry · melon · passion fruit', es: 'Melocotón · fresa · melón · maracuyá' } }
  ] },
  { id: 'mojitos', title: { fr: 'Virgin Mojito', en: 'Virgin mojito', es: 'Virgin mojito' }, items: [
    { id: 'mojito-menthe', n: { fr: 'Virgin Mojito menthe', en: 'Mint virgin mojito', es: 'Virgin mojito de menta' }, p: 70, c: ['#a9d28f'] },
    { id: 'mojito-passion', n: { fr: 'Virgin Mojito passion', en: 'Passion fruit virgin mojito', es: 'Virgin mojito de maracuyá' }, p: 70, c: ['#efc04a'] },
    { id: 'mojito-fraise', n: { fr: 'Virgin Mojito fraise', en: 'Strawberry virgin mojito', es: 'Virgin mojito de fresa' }, p: 70, c: ['#e2566a'] }
  ] },
  { id: 'smoothies', title: { fr: 'Smoothies', en: 'Smoothies', es: 'Smoothies' }, items: [
    { id: 'smoothie-exotique', n: { fr: 'Smoothie Exotique', en: 'Exotic smoothie', es: 'Smoothie exótico' }, p: 70, c: ['#f5b041'], i: { fr: 'Mangue · banane · fruit de la passion', en: 'Mango · banana · passion fruit', es: 'Mango · plátano · maracuyá' } },
    { id: 'smoothie-fruits-rouges', n: { fr: 'Smoothie Fruits Rouges', en: 'Red berry smoothie', es: 'Smoothie de frutos rojos' }, p: 70, c: ['#b4314c'], i: { fr: 'Fraise · framboise · myrtille · mûre', en: 'Strawberry · raspberry · blueberry · blackberry', es: 'Fresa · frambuesa · arándano · mora' } },
    { id: 'smoothie-green', n: 'Green Fresh', p: 70, c: ['#a3c46c'], i: { fr: 'Banane · pomme · kiwi', en: 'Banana · apple · kiwi', es: 'Plátano · manzana · kiwi' } },
    { id: 'smoothie-mango-passion', n: 'Mango Passion', p: 70, c: ['#f2a330'], i: { fr: 'Mangue · fruit de la passion', en: 'Mango · passion fruit', es: 'Mango · maracuyá' } },
    { id: 'smoothie-ace', n: 'ACE Boost', p: 70, c: ['#f08a24'], i: { fr: 'Citron · orange · carotte', en: 'Lemon · orange · carrot', es: 'Limón · naranja · zanahoria' } }
  ] },
  { id: 'milkshakes', title: { fr: 'Milkshakes', en: 'Milkshakes', es: 'Batidos' }, items: [
    { id: 'shake-vanille', n: { fr: 'Milkshake vanille', en: 'Vanilla milkshake', es: 'Batido de vainilla' }, p: 65, c: ['#f2e4c4'] },
    { id: 'shake-oreo', n: { fr: 'Milkshake Oreo', en: 'Oreo milkshake', es: 'Batido de Oreo' }, p: 70, c: ['#6e655f', '#ece6dc'] },
    { id: 'shake-fraise', n: { fr: 'Milkshake fraise', en: 'Strawberry milkshake', es: 'Batido de fresa' }, p: 65, c: ['#f0a5b1'] },
    { id: 'shake-caramel-speculos', n: { fr: 'Milkshake caramel spéculos', en: 'Caramel speculoos milkshake', es: 'Batido de caramelo y speculoos' }, p: 70, c: ['#c58a4f'] }
  ] }
];

// Ejemplo para la mesa vacía: brunch para dos.
window.EXAMPLE_TABLE = [['madame-naya', 1], ['pan-benedict-saumon', 1], ['trio-pancake', 1], ['spanish-latte', 2], ['jus-orange', 2]];
