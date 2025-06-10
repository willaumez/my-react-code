# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`
==============================================================================


# Composant Sélecteur de Bennes

Un composant React moderne et interactif pour la sélection de services de location de bennes avec un design UI/UX premium.

## Vue d'ensemble

Ce composant fournit une interface visuellement époustouflante permettant aux clients de parcourir et de sélectionner des services de location de bennes. Il comprend la récupération de données en temps réel, des visualisations 3D interactives de bennes, et un design responsive optimisé pour les expériences web modernes.

## Fonctionnalités

### 🎨 Design Visuel Premium
- **Arrière-plans Dégradés** : Arrière-plans dégradés multicouches dynamiques avec éléments flottants animés
- **Visualisations 3D des Bennes** : Conteneurs de bennes 3D construits sur mesure avec style réaliste et branding
- **Glassmorphisme** : Effets backdrop-blur modernes et éléments semi-transparents
- **Micro-animations** : Effets de survol subtils, transformations d'échelle et particules flottantes

### 🚀 Éléments Interactifs
- **Sélection Dynamique** : Fonctionnalité de sélection au clic avec retour visuel
- **Badges de Popularité** : Mise en évidence automatique des options populaires ("PLUS POPULAIRE", "RECOMMANDÉ")
- **Interface Responsive** : Adaptation parfaite aux appareils mobiles, tablettes et ordinateurs de bureau
- **Barre d'Action Flottante** : Résumé de sélection collant en bas avec détails et actions

### 📊 Gestion des Données
- **API REST** : Récupération des données depuis `https://app.wewantwaste.co.uk/api/skips/by-location`
- **Calcul des Prix** : Calcul automatique des prix finaux incluant la TVA
- **Gestion des États** : États de chargement, sélection et erreur gérés élégamment

### 🔧 Fonctionnalités Techniques
- **Performance Optimisée** : Transformations CSS3 et animations GPU-accélérées
- **Accessibilité** : Structure sémantique et navigation au clavier
- **Gestion d'Erreurs** : Gestion robuste des erreurs de réseau et de chargement

## Architecture du Composant

### Structure des États
```javascript
const [selectedSkip, setSelectedSkip] = useState(null);     // Benne sélectionnée
const [skipsData, setSkipsData] = useState([]);            // Données des bennes
const [loading, setLoading] = useState(true);              // État de chargement
```

### Fonctions Principales

#### `calculateFinalPrice(priceBeforeVat, vat)`
Calcule le prix final incluant la TVA avec arrondi approprié.

#### `handleSkipSelection(skip)`
Gère la logique de sélection/déselection des bennes avec toggle intelligent.

### Flux de Données
1. **Initialisation** : Récupération des données depuis l'API au montage du composant
2. **Affichage** : Rendu des cartes de bennes avec informations détaillées
3. **Interaction** : Gestion des sélections utilisateur avec retour visuel
4. **Confirmation** : Affichage de la barre d'action avec résumé de sélection

## Structure des Données

### Objet Skip
```javascript
{
  id: number,                    // Identifiant unique
  size: number,                  // Taille en yards
  category: string,              // Catégorie de la benne
  price_before_vat: number,      // Prix HT
  vat: number,                   // Taux de TVA (%)
  hire_period_days: number,      // Période de location en jours
  allowed_on_road: boolean,      // Autorisation voie publique
  allows_heavy_waste: boolean,   // Accepte déchets lourds
  popularity: number,            // Score de popularité (0-100)
  ideal: string,                 // Description usage idéal
  capacity: string               // Description capacité
}
```

## Composants Visuels

### 1. Section Hero
- Titre principal avec effet de texte dégradé
- Badge de service premium
- Description du service

### 2. Grille de Cartes
- **Layout Responsive** : 1 colonne (mobile) → 2 colonnes (tablette) → 3 colonnes (desktop)
- **Animations d'Entrée** : Délai échelonné pour chaque carte
- **Badges de Popularité** : Positionnement absolu avec animations

### 3. Visualisation 3D des Bennes
- **Conteneur Principal** : Dégradé jaune avec perspective 3D
- **Branding** : Logo "WE WANT WASTE" intégré
- **Poignées Réalistes** : Éléments latéraux avec ombres
- **Effets de Profondeur** : Ombres multiples et highlights

### 4. Barre d'Action Flottante
- **Position Fixe** : Collée en bas de l'écran
- **Backdrop Blur** : Effet de flou d'arrière-plan
- **Informations Détaillées** : Résumé complet de la sélection
- **Actions** : Boutons de déselection et continuation

## Styles et Animations avec Tailwind CSS

### Palette de Couleurs Tailwind
- **Primaire** : `blue-400/500/600` (#3B82F6, #4F46E5, #6366F1)
- **Accent** : `yellow-400/500/600` (#FCD34D, #F59E0B) pour les bennes
- **Neutral** : `gray-700/800/900` (#1F2937, #374151, #6B7280)
- **Status** : `emerald-500` (#10B981), `red-500` (#EF4444), `purple-500` (#8B5CF6)

### Classes Tailwind Principales Utilisées

#### Layout et Positionnement
```css
/* Grille responsive */
grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8

/* Flexbox avancé */
flex items-center justify-between gap-6

/* Positionnement */
absolute -top-4 left-1/2 transform -translate-x-1/2
fixed bottom-0 left-0 right-0
```

#### Effets Visuels
```css
/* Glassmorphisme */
bg-gray-800/40 backdrop-blur-xl border border-gray-700/50

/* Dégradés */
bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900
bg-gradient-to-r from-blue-600 to-indigo-600

/* Ombres avancées */
shadow-2xl shadow-blue-500/25
```

#### Animations et Transitions
```css
/* Transitions fluides */
transition-all duration-500 hover:scale-105

/* Animations personnalisées */
animate-pulse animate-bounce animate-spin

/* Transformations 3D */
transform-gpu perspective-1000
```

#### States Interactifs
```css
/* États de survol */
hover:bg-gray-600/60 hover:text-white hover:shadow-xl

/* Effets de focus */
focus:ring-2 focus:ring-blue-500 focus:outline-none

/* États conditionnels */
${isSelected ? 'bg-gradient-to-r from-blue-600 to-indigo-600' : 'bg-gray-700/50'}
```

## Responsive Design

### Points de Rupture
- **Mobile** : < 768px (1 colonne)
- **Tablette** : 768px - 1024px (2 colonnes)
- **Desktop** : > 1024px (3 colonnes)

### Adaptations
- **Typographie** : Tailles de police adaptatives
- **Espacement** : Padding et margin responsifs
- **Layout** : Flexbox et Grid pour arrangements flexibles
- **Barre d'Action** : Stack vertical sur mobile

## Technologies Utilisées

### Stack Technique
- **React 18** : Bibliothèque JavaScript pour l'interface utilisateur
- **Tailwind CSS** : Framework CSS utility-first pour le styling
- **Lucide React** : Bibliothèque d'icônes SVG modernes et légères
- **JavaScript ES6+** : Syntaxe moderne avec hooks React

### Dépendances Principales
```json
{
  "react": "^18.0.0",
  "lucide-react": "^0.263.1",
  "tailwindcss": "^3.0.0"
}
```

### Utilitaires Tailwind Utilisés
- **Layout** : `grid`, `flex`, `absolute`, `relative`, `fixed`
- **Spacing** : `p-*`, `m-*`, `gap-*`, `space-*`
- **Sizing** : `w-*`, `h-*`, `max-w-*`, `min-h-*`
- **Colors** : `bg-*`, `text-*`, `border-*` avec opacités
- **Effects** : `shadow-*`, `blur-*`, `backdrop-blur-*`
- **Transforms** : `scale-*`, `rotate-*`, `translate-*`
- **Transitions** : `transition-*`, `duration-*`, `ease-*`
- **Animations** : `animate-pulse`, `animate-bounce`, `animate-spin`

## Installation et Utilisation

### Prérequis
```bash
npm install react lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configuration Tailwind
Ajouter dans `tailwind.config.js` :
```javascript
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backdropBlur: {
        'xs': '2px',
      },
      perspective: {
        '1000': '1000px',
      }
    },
  },
  plugins: [],
}
```

### Utilisation
```jsx
import SkipSelector from './components/SkipSelector';
import './index.css'; // Import Tailwind CSS

function App() {
  return (
    <div className="App">
      <SkipSelector />
    </div>
  );
}
```

### Configuration CSS
Dans votre fichier `src/index.css` :
```css
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Classes personnalisées si nécessaire */
@layer utilities {
  .perspective-1000 {
    perspective: 1000px;
  }
  
  .rotateX-12 {
    transform: rotateX(12deg);
  }
  
  .rotateY-6 {
    transform: rotateY(6deg);
  }
}
```

### Configuration API
Le composant se connecte à l'API WeWantWaste :
```
GET https://app.wewantwaste.co.uk/api/skips/by-location?postcode=NR32&area=Lowestoft
```

## Optimisations Techniques

### Performance avec Tailwind
- **Purge CSS** : Seules les classes utilisées sont incluses dans le build final
- **JIT Mode** : Compilation à la demande pour des builds plus rapides
- **Animations GPU** : Utilisation de `transform-gpu` pour les performances 3D
- **Lazy Loading** : États de chargement pour améliorer l'UX

### Avantages de Tailwind CSS dans ce Projet
- **Consistance** : Design system unifié avec les utility classes
- **Maintenance** : Pas de CSS personnalisé à maintenir
- **Performance** : Bundle CSS optimisé automatiquement
- **Responsive** : Breakpoints intégrés (`md:`, `lg:`)
- **Dark Mode** : Support natif (si nécessaire)
- **States** : Pseudo-classes intégrées (`hover:`, `focus:`)