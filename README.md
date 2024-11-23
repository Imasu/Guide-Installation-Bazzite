# Guide d'installation uBlue

D.Bouvier  
<br>

[Documentation Bazzite](https://docs.bazzite.gg)  
<br><br>

## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/)  
<br><br>

## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`  
<br>

### Fedora Atomic
Liste des environnements `rpm-ostree status -v`  
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`  
Dé-conservation d'un environnement `sudo ostre admin pin --unpin <n>`  
<br>
Rollback vers le précédent environnement `rpm-ostree rollback`  
<br>
Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`  
Installation d'un package sur la couche de base `rpm-ostree install <package>`  
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`  
<br>
Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`  
<br><br>

## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method)  
<br>

### Host name
Commande `hostnamectl set-hostname <hostname>`  
<br>

### Flatpak

#### Quelques commandes:  
- Liste les sessions `flatpak remotes`  
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`  
- Rechercher un package `flatpak search <package>`  

#### Applications intéressantes  
- Bitwarden  
- SaveDesktop : Sauvegarde du bureau linux pour restoration  
- Apostrophe : Outil pour rédiger les fichiers ReadMe Github  
<br><br>

## Modding du système KDE
Le modding du bureau KDE est particulier sur les distribution uBlue. **Il ne faut pas installer les thèmes KDE à partir de l'installateur KDE de base mais les installer manuellement** dans son répertoire Home.  
[Documentation Bazzite - Customisation du bureau KDE](https://docs.bazzite.gg/General/Desktop_Environment_Tweaks/)  
[Bonne ressource sur le modding KDE](https://itsfoss.com/properly-theme-kde-plasma/)

### Installation des thèmes
1. Sauvegarde du thème téléchargé depuis le [KDE Store](https://store.kde.org/browse/) dans le répertoire `~/.local/share/plasma/`  
2. Ouvrir les paramètres système et sélectionner un par un les composants à appliquer  

#### Localisation des composants KDE extraits
- Thème Global: `~/.local/share/plasma/look-and-feel/  
- Thème Plasma: `~/.local/share/plasma/desktoptheme/`  
- Icônes et curseurs: `~/.local/share/icons/` (différent de la doc)  
Installation à partir d'une archive .tar.gz

#### Thème du Login Manager (SDDM)
Utiliser `Discover` pour installer les thèmes SDDM.
Ces thèmes peuvent également être mis en sur-couche (/!\ risqué) s'ils sont disponibles sous forme de package RPM avec `rpm-ostree`  

#### Autorisation des Flatpaks à utiliser les thèmes
Certains Flatpaks, ayant des problèmes avec les curseurs, nécessitent l'accès au filesystem. Leur octroyer individuellement ou globalement à partir de `Flatseal`  
Exemple: `~/.icons/:ro` dans la catégorie "Filesystem"  

#### Thème requérant `kvantum`  
Installer le composant en sur-couche `rpm-ostree install kvantum`  

#### Références pour les thèmes
Icones : Nova7, Nordzy, Fluent




