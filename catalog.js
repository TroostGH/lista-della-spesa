// =============================================================
//  Lista della spesa — Catalogo prodotti (100% vegano)
//  Nessun prodotto di origine animale: niente carne, pesce,
//  latticini animali, formaggi animali, uova o miele.
// =============================================================

// Categorie con etichetta, emoji e colore di accento
export const CATEGORIES = {
  frutta:      { label: "Frutta",                  emoji: "🍎", color: "#e8453c" },
  verdura:     { label: "Verdura",                 emoji: "🥕", color: "#5aa02c" },
  legumi:      { label: "Legumi",                  emoji: "🫘", color: "#b5651d" },
  proteine:    { label: "Proteine vegetali",       emoji: "🌱", color: "#2f9e63" },
  latte:       { label: "Latte e yogurt vegetali", emoji: "🥛", color: "#5b9bd5" },
  formaggi:    { label: "Formaggi vegetali",       emoji: "🧀", color: "#e0a52e" },
  cereali:     { label: "Cereali, pasta e riso",   emoji: "🌾", color: "#caa01f" },
  pane:        { label: "Pane e forno",            emoji: "🍞", color: "#c8893a" },
  fruttaSecca: { label: "Frutta secca e semi",     emoji: "🥜", color: "#a9744f" },
  condimenti:  { label: "Condimenti, oli e spezie",emoji: "🫒", color: "#7a8b2e" },
  conserve:    { label: "Salse e conserve",        emoji: "🥫", color: "#c0392b" },
  colazione:   { label: "Colazione e dolci",       emoji: "🥣", color: "#d98a3d" },
  snack:       { label: "Snack",                   emoji: "🍿", color: "#d9a406" },
  surgelati:   { label: "Surgelati",               emoji: "❄️", color: "#3ea6c0" },
  bevande:     { label: "Bevande",                 emoji: "🧃", color: "#7c4dff" },
  casa:        { label: "Casa e pulizia",          emoji: "🧽", color: "#5c6bc0" },
  igiene:      { label: "Igiene e cura persona",   emoji: "🧴", color: "#ec5f8a" },
  altro:       { label: "Altro",                   emoji: "🛒", color: "#8a8f98" },
};

// Prodotti per categoria: ["Nome", "emoji opzionale"]
const RAW = {
  frutta: [
    ["Mele","🍎"], ["Banane","🍌"], ["Arance","🍊"], ["Mandarini","🍊"], ["Clementine","🍊"],
    ["Limoni","🍋"], ["Lime","🍋"], ["Pompelmo","🍊"], ["Pere","🍐"], ["Pesche","🍑"],
    ["Albicocche","🍑"], ["Prugne","🍑"], ["Ciliegie","🍒"], ["Fragole","🍓"], ["Lamponi","🫐"],
    ["Mirtilli","🫐"], ["More","🫐"], ["Ribes","🫐"], ["Uva","🍇"], ["Anguria","🍉"],
    ["Melone","🍈"], ["Ananas","🍍"], ["Mango","🥭"], ["Avocado","🥑"], ["Kiwi","🥝"],
    ["Fichi","🟣"], ["Melagrana","🔴"], ["Cocco","🥥"], ["Datteri","🌴"], ["Cachi","🟠"],
    ["Nespole","🟠"], ["Papaya","🥭"], ["Frutti di bosco","🫐"], ["Uvetta","🍇"],
  ],
  verdura: [
    ["Pomodori","🍅"], ["Pomodorini","🍅"], ["Lattuga","🥬"], ["Insalata","🥬"], ["Rucola","🥬"],
    ["Spinaci","🥬"], ["Carote","🥕"], ["Patate","🥔"], ["Patate dolci","🍠"], ["Cipolle","🧅"],
    ["Cipolle rosse","🧅"], ["Aglio","🧄"], ["Scalogno","🧅"], ["Porri","🥬"], ["Zucchine","🥒"],
    ["Melanzane","🍆"], ["Peperoni","🫑"], ["Peperoncino","🌶️"], ["Broccoli","🥦"], ["Cavolfiore","🥦"],
    ["Cavolo","🥬"], ["Cavolo nero","🥬"], ["Verza","🥬"], ["Cavoletti di Bruxelles","🥬"], ["Zucca","🎃"],
    ["Sedano","🥬"], ["Finocchi","🥬"], ["Funghi","🍄"], ["Funghi champignon","🍄"], ["Asparagi","🥬"],
    ["Fagiolini","🫛"], ["Piselli freschi","🫛"], ["Mais","🌽"], ["Cetrioli","🥒"], ["Radicchio","🥬"],
    ["Bietole","🥬"], ["Carciofi","🥬"], ["Ravanelli","🔴"], ["Barbabietola","🟣"], ["Cime di rapa","🥬"],
    ["Prezzemolo","🌿"], ["Basilico","🌿"], ["Rosmarino","🌿"], ["Salvia","🌿"], ["Menta","🌿"],
    ["Zenzero","🫚"], ["Germogli","🌱"],
  ],
  legumi: [
    ["Lenticchie","🫘"], ["Lenticchie rosse","🫘"], ["Ceci","🫘"], ["Fagioli borlotti","🫘"],
    ["Fagioli cannellini","🫘"], ["Fagioli neri","🫘"], ["Fagioli rossi","🫘"], ["Fave","🫛"],
    ["Piselli secchi","🫛"], ["Soia gialla","🫘"], ["Edamame","🫛"], ["Cicerchie","🫘"],
    ["Lupini","🫘"], ["Hummus","🥣"],
  ],
  proteine: [
    ["Tofu","🌱"], ["Tofu affumicato","🌱"], ["Tofu vellutato","🌱"], ["Tempeh","🌱"], ["Seitan","🌱"],
    ["Soia texturizzata","🌱"], ["Burger vegetali","🍔"], ["Polpette vegetali","🌱"], ["Affettati vegetali","🌱"],
    ["Würstel vegetali","🌭"], ["Falafel","🧆"], ["Muscolo di grano","🌱"], ["Cotolette vegetali","🌱"],
    ["Ragù vegetale","🍝"], ["Nuggets vegetali","🌱"],
  ],
  latte: [
    ["Latte di soia","🥛"], ["Latte di mandorla","🥛"], ["Latte d'avena","🥛"], ["Latte di riso","🥛"],
    ["Latte di cocco","🥛"], ["Latte di nocciola","🥛"], ["Latte di anacardi","🥛"], ["Latte di canapa","🥛"],
    ["Yogurt di soia","🥣"], ["Yogurt di cocco","🥣"], ["Yogurt di mandorla","🥣"], ["Panna vegetale","🥛"],
    ["Panna di soia da cucina","🥛"], ["Besciamella vegetale","🥛"], ["Burro vegetale","🧈"], ["Gelato vegetale","🍨"],
  ],
  formaggi: [
    ["Formaggio vegetale spalmabile","🧀"], ["Formaggio vegetale a fette","🧀"], ["Mozzarella vegetale","🧀"],
    ["Parmigiano vegetale","🧀"], ["Cheddar vegetale","🧀"], ["Ricotta vegetale","🧀"], ["Feta vegetale","🧀"],
  ],
  cereali: [
    ["Pasta","🍝"], ["Pasta integrale","🍝"], ["Spaghetti","🍝"], ["Penne","🍝"], ["Fusilli","🍝"],
    ["Pasta di legumi","🍝"], ["Pasta senza glutine","🍝"], ["Lasagne","🍝"], ["Gnocchi di patate","🥔"],
    ["Riso","🍚"], ["Riso integrale","🍚"], ["Riso basmati","🍚"], ["Riso per risotti","🍚"], ["Riso venere","🍚"],
    ["Couscous","🍚"], ["Bulgur","🌾"], ["Quinoa","🌾"], ["Farro","🌾"], ["Orzo","🌾"], ["Avena","🌾"],
    ["Fiocchi d'avena","🥣"], ["Polenta","🌽"], ["Miglio","🌾"], ["Grano saraceno","🌾"], ["Noodles","🍜"],
    ["Farina 00","🌾"], ["Farina integrale","🌾"], ["Farina di ceci","🌾"], ["Farina di mandorle","🌾"],
    ["Lievito di birra","🫧"], ["Lievito per dolci","🫧"], ["Bicarbonato","🫧"],
  ],
  pane: [
    ["Pane","🍞"], ["Pane integrale","🍞"], ["Pane in cassetta","🍞"], ["Pancarrè","🍞"], ["Baguette","🥖"],
    ["Focaccia","🍞"], ["Piadina","🫓"], ["Tortillas","🫓"], ["Grissini","🥖"], ["Crackers","🍘"],
    ["Fette biscottate","🍞"], ["Pangrattato","🍞"], ["Taralli","🥨"], ["Pita","🫓"],
  ],
  fruttaSecca: [
    ["Noci","🥜"], ["Mandorle","🥜"], ["Nocciole","🌰"], ["Anacardi","🥜"], ["Pistacchi","🥜"],
    ["Arachidi","🥜"], ["Pinoli","🌰"], ["Semi di girasole","🌻"], ["Semi di zucca","🎃"],
    ["Semi di sesamo","🌱"], ["Semi di lino","🌱"], ["Semi di chia","🌱"], ["Semi di canapa","🌱"],
    ["Burro di arachidi","🥜"], ["Crema di mandorle","🥜"], ["Crema di nocciole","🌰"], ["Tahina","🥣"],
  ],
  condimenti: [
    ["Olio extravergine d'oliva","🫒"], ["Olio di oliva","🫒"], ["Olio di semi","🌻"], ["Olio di cocco","🥥"],
    ["Aceto","🧴"], ["Aceto balsamico","🧴"], ["Aceto di mele","🧴"], ["Sale","🧂"], ["Sale grosso","🧂"],
    ["Pepe","🧂"], ["Zucchero","🍬"], ["Zucchero di canna","🍬"], ["Sciroppo d'acero","🍁"], ["Sciroppo d'agave","🌵"],
    ["Salsa di soia","🍶"], ["Tamari","🍶"], ["Senape","🌭"], ["Lievito alimentare","🌼"], ["Curry","🍛"],
    ["Paprika","🌶️"], ["Curcuma","🟡"], ["Cumino","🌿"], ["Origano","🌿"], ["Cannella","🟤"],
    ["Noce moscata","🌰"], ["Vaniglia","🌼"], ["Dado vegetale","🧊"], ["Brodo vegetale","🍲"], ["Capperi","🟢"],
  ],
  conserve: [
    ["Passata di pomodoro","🍅"], ["Polpa di pomodoro","🍅"], ["Pomodori pelati","🥫"], ["Concentrato di pomodoro","🍅"],
    ["Pesto vegano","🌿"], ["Sugo pronto","🍝"], ["Maionese vegana","🥫"], ["Ketchup","🍅"], ["Olive verdi","🫒"],
    ["Olive nere","🫒"], ["Sottaceti","🥒"], ["Mais in scatola","🌽"], ["Tonno vegetale","🥫"], ["Cuori di palma","🥫"],
    ["Pomodori secchi","🍅"], ["Carciofini","🥫"], ["Marmellata","🍓"], ["Confettura","🍓"], ["Crema spalmabile al cacao","🍫"],
  ],
  colazione: [
    ["Cereali","🥣"], ["Muesli","🥣"], ["Granola","🥣"], ["Corn flakes","🥣"], ["Biscotti vegani","🍪"],
    ["Cioccolato fondente","🍫"], ["Cacao amaro","🍫"], ["Barrette ai cereali","🍫"], ["Wafer","🧇"],
    ["Plumcake vegano","🍰"], ["Crostata vegana","🥧"], ["Croissant vegani","🥐"], ["Zucchero a velo","🍬"],
    ["Budino vegetale","🍮"], ["Tè in bustine","🍵"], ["Caffè","☕"],
  ],
  snack: [
    ["Patatine","🍟"], ["Popcorn","🍿"], ["Gallette di riso","🍘"], ["Gallette di mais","🍘"],
    ["Frutta secca mista","🥜"], ["Frutta disidratata","🍑"], ["Barrette proteiche vegane","🍫"], ["Nachos","🌮"],
  ],
  surgelati: [
    ["Verdure surgelate","❄️"], ["Spinaci surgelati","❄️"], ["Minestrone surgelato","❄️"], ["Piselli surgelati","❄️"],
    ["Patatine fritte surgelate","🍟"], ["Pizza vegana surgelata","🍕"], ["Gelato vegetale","🍨"],
    ["Frutti di bosco surgelati","🫐"], ["Edamame surgelati","🫛"], ["Bastoncini vegetali surgelati","❄️"],
  ],
  bevande: [
    ["Acqua naturale","💧"], ["Acqua frizzante","💧"], ["Succo d'arancia","🧃"], ["Succo di mela","🧃"],
    ["Succhi di frutta","🧃"], ["Spremuta","🍊"], ["Cola","🥤"], ["Aranciata","🥤"], ["Tè freddo","🧋"],
    ["Tisane","🍵"], ["Camomilla","🍵"], ["Caffè macinato","☕"], ["Caffè in cialde","☕"], ["Orzo solubile","☕"],
    ["Vino rosso","🍷"], ["Vino bianco","🍷"], ["Birra","🍺"], ["Spumante","🍾"], ["Acqua tonica","🥤"],
  ],
  casa: [
    ["Detersivo piatti","🧽"], ["Detersivo lavastoviglie","🧽"], ["Detersivo lavatrice","🧺"], ["Ammorbidente","🧺"],
    ["Detergente multiuso","🧴"], ["Candeggina","🧴"], ["Sgrassatore","🧴"], ["Anticalcare","🧴"], ["Spugne","🧽"],
    ["Carta da cucina","🧻"], ["Carta igienica","🧻"], ["Tovaglioli","🧻"], ["Sacchetti spazzatura","🗑️"],
    ["Sacchetti freezer","🧊"], ["Pellicola trasparente","📦"], ["Carta forno","📄"], ["Alluminio","📦"],
    ["Fiammiferi","🔥"], ["Pile","🔋"], ["Lampadine","💡"], ["Detersivo pavimenti","🧴"],
  ],
  igiene: [
    ["Dentifricio","🪥"], ["Spazzolino","🪥"], ["Filo interdentale","🦷"], ["Collutorio","🧴"], ["Sapone","🧼"],
    ["Bagnoschiuma","🧴"], ["Shampoo","🧴"], ["Balsamo","🧴"], ["Deodorante","🧴"], ["Rasoi","🪒"],
    ["Schiuma da barba","🧴"], ["Crema corpo","🧴"], ["Crema viso","🧴"], ["Salviette","🧻"], ["Cotton fioc","🦠"],
    ["Fazzoletti","🤧"], ["Crema solare","🧴"], ["Cerotti","🩹"], ["Burrocacao","💄"],
  ],
};

// Lista piatta dei prodotti del catalogo
export const CATALOG = [];
for (const [cat, items] of Object.entries(RAW)) {
  for (const [name, emoji] of items) {
    CATALOG.push({
      name,
      cat,
      emoji: emoji || CATEGORIES[cat].emoji,
    });
  }
}
