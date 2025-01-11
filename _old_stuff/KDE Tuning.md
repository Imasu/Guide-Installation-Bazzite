<br><br><br>
## Modding du système KDE
Le modding du bureau KDE est particulier sur les distribution uBlue. **Il ne faut pas installer les thèmes KDE à partir de l'installateur KDE de base mais les installer manuellement** dans son répertoire Home.  
Sauvegarde du bureau après paramètrage disponible sous `One Drive`  

[Documentation Bazzite - Customisation du bureau KDE](https://docs.bazzite.gg/General/Desktop_Environment_Tweaks/)  
[Bonne ressource sur le modding KDE](https://itsfoss.com/properly-theme-kde-plasma/)

### Installation des thèmes
1. Sauvegarde du thème téléchargé depuis le [KDE Store](https://store.kde.org/browse/) dans le répertoire `~/.local/share/plasma/`  
2. Ouvrir les paramètres système et sélectionner un par un les composants à appliquer  
<br>

### Localisation des composants KDE extraits
- Thème Global: `~/.local/share/plasma/look-and-feel/`  
- Thème Plasma: `~/.local/share/plasma/desktoptheme/`  
- Icônes et curseurs: `~/.local/share/icons/` (différent de la doc)  
Installation à partir d'une archive .tar.gz  

#### Thème du Login Manager (SDDM)
Utiliser `Discover` pour installer les thèmes SDDM.  
Ces thèmes peuvent également être mis en sur-couche (/!\ risqué) s'ils sont disponibles sous forme de package RPM avec `rpm-ostree`  
<br>

#### Autorisation des Flatpaks à utiliser les thèmes
Certains Flatpaks, ayant des problèmes avec les curseurs, nécessitent l'accès au filesystem. Leur octroyer individuellement ou globalement à partir de `Flatseal`  
Exemple: `~/.icons/:ro` dans la catégorie "Filesystem"  
<br>

#### Thème requérant `kvantum`  
Installer le composant en sur-couche `rpm-ostree install kvantum`  
<br>

#### Références pour les thèmes
Icones : Nova7 (préféré), Nordzy, Fluent  
