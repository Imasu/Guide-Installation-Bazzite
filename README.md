# Guide d'installation Bazzite

Synthèse de mon installation de Bazzite Gnome Nvidia 
<br>
[Documentation Bazzite](https://docs.bazzite.gg)  
[Blog généraliste sur Linux avec astuces](https://www.linuxtricks.fr/pages/bienvenue-sur-linuxtricks)  
<br><br><br>




## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/).  
Commande pour lister les partitions: `lsblk`  
Article pour retrouver les commandes de changement de droits sur les répertoires: [linux file permissions](https://www.pluralsight.com/resources/blog/tech-operations/linux-file-permissions)  
<br><br><br>




## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`.  
Affiche le contenu du script ujust `ujust --show <script>`.  
<br>

### Commandes rpm-ostree d'une Fedora Atomic
Liste des environnements `rpm-ostree status -v`.  
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`.  
Dé-conservation d'un environnement `sudo ostree admin pin --unpin <n>`.  
<br>
Rollback vers le précédent environnement `rpm-ostree rollback`.  
<br>
Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`.  
Installation d'un package sur la couche de base `rpm-ostree install <package>`.  
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`.  
<br>
Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`.  
<br>

### Commandes linux
- `rpm -qi <nom du package/programme>` : description de diverses informations sur le package (version, release, date d'installation...)
- `passwd username` : forçage du mot de passe sans tenir compte des restriction de format  
<br><br><br>




## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method).  
<br>


### Configuration système
Passer le clavier en `Français` et non en `Français (alternative)`  
Changement du nom du PC  
```
hostnamectl set-hostname <hostname>
```
<br>


### Configuration Gnome
Taille des polices, couleurs, etc
```
gsettings set org.gnome.desktop.interface accent-color 'slate'
gsettings set org.gnome.desktop.interface clock-show-date true
gsettings set org.gnome.desktop.interface clock-show-seconds true
gsettings set org.gnome.desktop.interface clock-show-weekday true
gsettings set org.gnome.desktop.interface enable-hot-corners false
gsettings set org.gnome.desktop.interface font-antialiasing 'rgba'
gsettings set org.gnome.desktop.interface font-hinting 'full'
gsettings set org.gnome.desktop.interface font-rgba-order 'rgb'
gsettings set org.gnome.desktop.interface text-scaling-factor 0.92
gsettings set org.gnome.desktop.calendar show-weekdate true
gsettings set org.gnome.mutter.attach-modal-dialogs false
```
<br>


### Gnome Tweaks / Refine -> remplacés par Tuner & Ignition
Bazzite a supprimé en version 42 Gnome Tweaks, puis de Refine pour Tuner. Au 08/08/2025, il est préférable de rester sur `Refine` pour disposer de davantage d'options et de moins de bugs.    
L'application pour gérer les applications lancées automatiquement est Ignition.  
Exemple de configuration d'un script pour Solaar (cf. infra, section flatpak):
```
flatpak run io.github.pwr_solaar.solaar --window=hide
```
<br>


### Configuration des services kDrive, OneDrive, Google Calendar ou Drive
L'installation de kDrive se réalise depuis l'interface de comptes en ligne de Gnome, connecter un compte `Agendas, contacts et fichier`.  
[Mode opératoire](https://www.infomaniak.com/fr/support/faq/2409/se-connecter-a-kdrive-par-webdav)  
<br>


### Configuration de TERMINAL
Thème : Palette = `GNOME`  
<br>


### Configuration de BASH
Installation de Oh-My-Bash à partir de cette ligne de commande (source: [Configurer Bash avec Oh-my-Bash](https://just-sudo-it.be/configurer-et-personnaliser-bash-avec-oh-my-bash/).  
```
bash -c "$(wget https://raw.githubusercontent.com/ohmybash/oh-my-bash/master/tools/install.sh -O -)"
```
Dans le fichier `.bashrc`:  
1. Thème sélectionné: `powerline-multiline`,  
2. Recopier les lignes originales du `.bashrc` de Bazzite dans la version générée par Oh-My-Bash. Nécessaire pour que `Brew` fonctionne,  
3. Corriger un problème d'autocompletion par ajout **en fin** de .bashrc de `complete -d cd` ([Source issue 448](https://github.com/ohmybash/oh-my-bash/issues/448)),  
4. Prise en compte des modifications par la commande `source .bashrc`.  
<br>


### Configuration de NANO
Modification du fichier de configuration `/etc/nanorc` :  
- Auto indentation: `set autoindent`
- Affichage du numéro de la ligne: `set linenumbers`  
- Gestion de la souris: `set mouse`  
- Thèmes: `include /usr/share/nano/*.nanorc` et `include /usr/share/nano/extra/*.nanorc`
- Key bindings: décommenter les raccourcis nécessaires : `Crl+X, C, V, Q, S, F, G, Z, Y`
<br>


### Bug ayant fait l'objet d'un contournement (à suivre pour le désactiver)
#### [pb sur le réveil de la carte graphique, pb gnome](https://github.com/ublue-os/bazzite/issues/2437)
- 11/04/2025. Version: 41.20250409.1 (2025-04-09T19:07:51Z)  




<br><br><br>
## Setup des applications

### Flatpak
#### Quelques commandes:  
- Liste les sessions `flatpak remotes`  
- Liste les flatpack d'une session `flatpack remote-ls <remote>`  
- Installation et désinstallation sur la session utilisateur `flatpak install <remote> <package>` / `flatpak uninstall <remote> <package>`  
- Rechercher un package `flatpak search <package>`  
- Lancer un package `flatpak run <package>`  
- Permissions d'un package `flatpak info --show-permissions <package>`  
<br>

#### FLATSEAL
Ajouter pour toutes les applications les permissions suivantes:  
```
Accélaration GPU : enable
```
<br>

#### Suppression des applications installées par défaut
Suppression d'applications installées par défaut:
```
flatpak uninstall system firefox
```
- Le répertoire `$HOME/.mozilla` peut être supprimé.
<br>

#### Applications utilisées  
A installer sur la session System pour éviter les doublons des packages de base et gagner de la place:  
```
flatpak install system refine vivaldi gedit betterbird simplescan libreoffice solaar digiKam
```
digiKam = gestionnaire de photos.  
solaar = gestionnaire de périphériques Logitech.  
<br><br>


### AppImage
Autre service d'applications notament pour celles achetées.  
Gestion à partir de l'application `Levier de vitesse / Gear Level`.  
Créer un répertoire `~/.AppImages` pour les stocker.  

#### Applications utilisées  
- Cider (acheté via [itch.io](https://itch.io)).  
<br><br>


### Brew
Applications et services sans GUI. Permet l'installation d'applications utilisées dans les lignes de commande.   

#### Applications utilisées
- exiftool : manipulation de fichiers images et vidéo par ligne de commande  
```
Utiliser les paramètres   DateTimeOriginal   ou  CreateDate   pour ces commandes

// Renomme les fichiers par leur date de prise de vue (format YYY-MM-DD_HH:MM_id)
exiftool '-FileName<DateTimeOriginal' -d '%Y-%m-%d_%H:%M_%%-c.%%e' -r ~/Images/Google Photos/

// Crée des répertoires de type YYYY/MM et y déplace les fichiers selon leur date de prise de vue
exiftool -r -d %Y/%m "-directory<createdate" ~/Images

// Remplace les dates de dernière modification des fichiers par leur date de prise de vue
exiftool -overwrite_original '-FileModifyDate<DateTimeOriginal' -r ~/Images/
```


<br><br><br>
## Modding du système GNOME

### Extensions supplémentaires
Liste d'extensions à installer depuis `Gestionnaire d'extensions`:  
- Dash to Dock: Position et taille -> `taille des icônes: 40`, Apparence -> `réduire les marges`, `utiliser le thème par défaut`
- Desktop Icons NG  
- Extension List  
- SimpleWeather.  Clé API personnelle [WeatherAPI.com](https://www.weatherapi.com/) si besoin    
- Hide Top Bar: activer l'option Sensitivity -> `Show panel when mouse approaches...`; désactiver les options Sensitivity -> `In the above case, also show panel when fullscreen`, Intellihide -> `only when the active window takes the space`.  
<br>

En standard sur Bazzite: AppIndicator and KStatusNotifierItem Support, Blur my shell, Caffeine, Hot Edge, Just Perfection, Logo Menu, Tiling Shell, User Themes.  
- Just Perfection: dans comportement sélectionner `Bureau` pour l'option `Etat de démarrage`  
- L'extension Hot Edge est à désactiver pour éviter de basculer sur les autres bureaux lorsque la souris se déplace rapidemment vers le bas de l'écran.  
<br>

### Application du thème [WhiteSur](https://github.com/vinceliuice/WhiteSur-gtk-theme) 
1. Créer une distrobox pour la compilation du theme avec un home folder distinct  
```
distrobox create -i "fedora:latest" -n "sys-deskcustom" -H "$HOME/.containers-home/sys-deskcustom"
```
3. Dans la distrobox, installer `git` et toutes les dépendances demandées : `sudo dnf install git <packages>`  
4. Dans la distrobox, téléchager le thème et l'installer avec les commandes  
```
cd
git clone https://github.com/vinceliuice/WhiteSur-gtk-theme.git --depth=1
cd WhiteSur-gtk-theme
./install.sh -l -HD
./tweaks.sh -F
```
4. Depuis la console du système hôte, copier le contenu des répertoires suivants dans leur homologue du système hôte  
```
cp -r $HOME/.containers-home/sys-deskcustom/.config/gtk-4.0 $HOME/.config/
cp -r $HOME/.containers-home/sys-deskcustom/.themes  $HOME/.local/share/themes
```
5. Depuis la console du système hôte, modifier les deux fichiers liens qui pointent vers le répertoire du container  
```
ln -s -f $HOME/.config/gtk-4.0/gtk-Dark.css $HOME/.config/gtk-4.0/gtk.css
ln -s -f $HOME/.config/gtk-4.0/gtk-Dark.css $HOME/.config/gtk-4.0/gtk-dark.css
```
7. Installer les Flatpaks générés par l'installation  
Le script d'installation a généré des fichiers flatpak dans le répertoire `$HOME/.containers-home/sys-deskcustom/.cache/pakitheme`  
Depuis la console du système hôte, aller dans ce répertoire et pour chaque sous répertoire installer le flatpak en mode system:  
```
cd $HOME/.containers-home/sys-deskcustom/.cache/pakitheme
flatpak --system install WhiteSur-Dark/org.gtk.Gtk3theme.WhiteSur-Dark-x86_64.flatpak
flatpak --system install WhiteSur-Dark-solid/org.gtk.Gtk3theme.WhiteSur-Dark-solid-x86_64.flatpak
flatpak --system install WhiteSur-Light/org.gtk.Gtk3theme.WhiteSur-Light-x86_64.flatpak
```
7. Paramétrer les permissions Flatpak à partir de FlatSeal  
Ajouter dans la section `Filesystem` pour toutes les applications les permissions suivantes  
```
/var/home/$user name$/.local/share/icons/*:ro
/var/home/$user name$/.local/share/themes/*:ro
xdg-config/gtk-4.0:ro
xdg-config/gtk-3.0:ro
```
8. Les icônes [WhiteSur Icon Theme](https://www.pling.com/p/1405756/) sont à déposer dans le répertoire `$HOME/.local/share/icons`  
Ne pas utiliser les icônes WhiteSur qui posent des problèmes sur Wayland.  
9. Les curseurs [Bibata Modern Ice](https://www.gnome-look.org/p/1197198) sont à déposer dans le même répertoire `$HOME/.local/share/icons`  
10. Le thème est à appliquer depuis Refine    
11. Supprimer le container `distrobox rm sys-deskcustom`, le répertoire `$HOME/.containers-home/sys-deskcustom`, le réperoirte `WhiteSur-gtk-theme` créé lors du processus d'installation.  





<br><br><br>
## Paramétrage de Steam pour le partage des jeux entre comptes
Solution dérivée de [configuration du répertoire steam](https://steamcommunity.com/discussions/forum/1/4543572701313233470/) et de [source pour la commande setfacl](https://www.baeldung.com/linux/new-files-dirs-default-permission).  

### Configuration de la bibliothèque
Répertoire utilisé comme bibliothèque: /var/steam-library/.  
```
sudo groupadd gamers
#Ajout des utilisateurs au nouveau groupe
sudo usermod -a -G gamers user1
sudo usermod -a -G gamers user2
sudo mkdir /var/steam-library
sudo chgrp -R gamers /var/steam-library/
sudo setfacl -PRdm u::rwx,g:gamers:rwx,o::r /var/steam-library
//sudo setfacl -R -b /var/steam-library/
//sudo setfacl -R -m g:gamers:rwX /var/steam-library/
//sudo setfacl -m d:g:gamers:rwx /var/steam-library/
```
<br>

### Configuration de Steam
Modifier dans steam, pour tous les utilisateurs, le répertoire de stockage des jeux.  





<br><br><br>
## Installation d'une machine virtuelle Windows avec copier/coller et taille de bureau ajustable
Bazzite offre une configuration fonctionnelle par utilisation du script `ujust setup-virtualization`.  /!\ Il y a souvent des bugs dans le script d'origine -> reprendre les instructions erronées manuellement (ujust --show ...).  
Il est nécessaire d'activer VFIO /IOMMU pour bénéficier de meilleures performances. Pas de procédure fonctionnelle de CPU pass-through pour l'instant avec un iGPU... donc pas de cristal glass...  
<br>
Chemin des images sous libvirt: `/var/lib/libvirt/images`  
<br>
Guides pour l'installation du VM Windows. Une version est sauvegardée dans le github.  
- [How Do I Properly Install KVM on Linux](https://sysguides.com/install-kvm-on-linux)  
- [How to Properly Install a Windows 11 Virtual Machine on KVM](https://sysguides.com/install-a-windows-11-virtual-machine-on-kvm)  
- [VFIO dGPU Passthrough Guide](https://asus-linux.org/guides/vfio-guide/)  
<br>

Remarques & étapes:  
- Concernant l'installation de KVM, seules les sections 9 et 10 du 1er guide restent pertinentes. Ce n'est pas peine de créer les services libvirtd individuels car Bazzite fonctionne déjà ainsi.  
- Le guide Asus est très intéressant pour les hooks qemu et la conf KVM qu'il propose (hooks, memballoon...).  
En partant du principe d'une machine virtuelle nommée `Window_11`, le github contient le fichier KVM optimisé et le répertoire pour les hooks à déposer dans `/etc/libvirt/hooks/qemu.d/`. **Les deux fonctionnent ensemble, sinon des erreurs seront remontées par KVM.**  
- Concernant l'installation de la VM Windows, la configuration de KVM proposée dans les 2 premiers guides n'est pas optimale pour mon PC.  Elément le plus important: Configuration du processeur en mode : IvyBridge-IBRS [source](https://serverfault.com/questions/980386/high-cpu-usage-on-windows-guest-kvm-machine) avec PIN des CPU.  
Configuration optimisée: [Configuration KVM Windows](https://github.com/Imasu/Guide-Installation-Bazzite/tree/main/KVM%20Setup/).  
<br>

Drivers Virtio:  
- [Lien vers les drivers Virtuo (iso & exe)](https://fedorapeople.org/groups/virt/virtio-win/direct-downloads/archive-virtio/).  
- [Lien vers les spice tools](https://www.spice-space.org/download/windows/spice-guest-tools/spice-guest-tools-latest.exe).  





<br><br><br>
## Installation de git
L'installation de git sur le poste principal est très simple grace à l'utilisation de GitHub CLI.  
Le choix du protocole HTTPS permet un clonage effectif des répertoires avec un `git clone <lien https>`  
```
git config --global user.name  "Imasu"
git config --global user.email "@gmail.com"
brew install gh
gh auth login
```
<br>

Guide synthétique d'utilisation de git: [Git Push Local Branch to Remote – How to Publish a New Branch in Git](https://www.freecodecamp.org/news/git-push-local-branch-to-remote-how-to-publish-a-new-branch-in-git/).  
Quelques commandes utiles:  
-`git init` pour initialiser un dépôt local  
-`git add .` pour ajouter tous les fichiers du répertoire au dépôt local  
-`git commit -m "commit message"` pour sauvegarder les changements fait aux fichiers locaux  
<br>
-`git remote add origin <url.git>` pour attacher le dépôt à un serveur distant Git  
-`git remote -v` pour vérifier l'attachement au serveur distant  
<br>
-`git pull` pour synchroniser depuis le serveur distant  
-`git push -u origin main` pour envoyer les modifications sur le serveur distant (il est possible de changer la branche avec la commande `git branch -M main`)  





<br><br><br>
## Installation d'un environnement de développement conteneurisé
Choix le plus simple et avisé !!  

### Container Distrobox  
Installation d'une distrobox selon cette commande. Il ne faut pas utiliser la version GUI BOXES qui ne propose pas toutes les options.  
**Il est important de spécifier un chemin HOME dédié pour éviter que les fichiers de l'hôte soient modifiés par ceux du conteneur.**  

Liste de containers [distrobox containers distros](https://github.com/89luca89/distrobox/blob/main/docs/compatibility.md#containers-distros)  

Distributions testées et fonctionnelles (wayland):  
- Fedora : --image quay.io/fedora/fedora-toolbox:latest,  
- Archlinux : --image quay.io/toolbx/arch-toolbox:latest,  
<br>

Exemples avec implémentation du driver nvidia et une isolation renforcée (--unshare-all --init). Attention au répertoire pour le dossier $HOME du conteneur  
```
distrobox create --image quay.io/fedora/fedora-toolbox:latest --name <Name>-FedoraOS --nvidia --unshare-all --home /home/$USER/.containers-home/<Name>-FedoraOS
```

### Paramétrage du container

#### Activation du pilote Vulkan (bug lié à Fedora/Silverblue/Bazzite, non corrigé au 06/04/2025)
Par défaut, le pilote Vulkan ne fonctionnera pas car le flag --nvidia ne trouvera pas l'un des fichiers de configuration [source](https://github.com/NVIDIA/nvidia-container-toolkit/issues/811)  
Solution le temps que Fedora/Silverblue/Bazzite introduise un fix:  
```
## Copier le fichier manquant depuis l'hôte en le renommant puis le recopier dans le bon répertoire du conteneur
Hôte:
cp /usr/share/vulkan/icd.d/nvidia_icd.x86_64.json ~/Téléchargements/nvidia_icd.json

Conteneur:
sudo cp Téléchargements/nvidia_icd.json /usr/share/vulkan/icd.d/

```
Vérification par installation de `vulkan-tools` puis par la commande `vulkaninfo --summary`  
<br>


#### Configuration du shell
Définir un profil pour le Bash avec la palette `Tokyo Night Moon`  
<br>


#### Paquets à installer
Installation des paquets essentiels : nano, git...  
```
FEDORA:
  sudo dnf update
  sudo dnf install gcc nano git chromium
```  
- `gcc` : outil de compilation  
- `chromium` : requis pour disposer des librairies graphiques et pour qu'un navigateur soit actif sur le conteneur (nécessaire par exemple pour la documentation des programmes Rust)  

Optionnel:
- Installation de `Oh-My-Bash` en suivant le guide supra. Ne fonctionne que si l'on est entré dans le container à partir du menu du Shell. Thèmes à utiliser: `agnoster` ou `powerline-multiline`.  
- Configuration de `nano` en suivant le guide supra.
<br>


Installation de RustRover (JetBrains):  
- Depuis la racine du $HOME du container (cd ~/), [suivre la procédure de JetBrains](https://www.jetbrains.com/help/rust/installation-guide.html#standalone)  
- Il est possible après de créer un symlink vers ~/.local/bin pour pouvoir lancer RustRover directement sans aller dans son répertoire d'installation (/opt/RustRover...)  
```
ln -s /opt/RustRover-2025.2/bin/rustrover ~/.local/bin/rustrover
ln -s ~/.local/bin/rustrover ~/.local/bin/RR
```
- Lors de la première connexion, l'enregistrement de la license est nécessaire. Sélectionner la méthode par token.   
<br>

Alternative - Installation de VS Code: depuis la racine du $HOME du container (cd ~/), suivre la procédure de MS  [source](https://code.visualstudio.com/docs/setup/linux)  
<br>


Paramétrage de base de Git [Commandes GIT de base](https://www.hostinger.fr/tutoriels/commandes-git)  
```
git config --global user.name  "Imasu"
git config --global user.email "@gmail.com"
```
Note. Dans les projets, pour éviter la synchronisation de certains fichiers ou répertoires, créer un fichier `.gitignore` avec les paramètrages nécessaires.  
<br>


#### Installation des languages
Languages testés:  
- Rust : [Install Rust in Fedora](https://developer.fedoraproject.org/tech/languages/rust/rust-installation.html). Installer via Rustup.  
  * Debugger : `lldb` à installer séparément.  
  * Créer un fichier `rustfmt.toml` dans un répertoire `~/.config/rustfmt/` avec les valeurs de formatage à appliquer à tous les programmes Rust [source](https://rust-lang.github.io/rustfmt/?version=v1.8.0&search=).  
- Rust : (Arch) [Install Rust in Arch (wiki Arch)](https://wiki.archlinux.org/title/Rust). Installer les packages `base-devel`, `rustup` et `sccache`. Suivre le guide associé avec l'installation de la toolchain, l'optimisation de la compilation CPU et des temps de compilation par création du fichier `~/.cargo/config.toml`.
- Odin : Installer les packages `odin lldb`. Le dernier correspond au debugger. 
- Go : [install go in arch using Pacman](https://www.bomberbot.com/golang/how-to-install-go-in-arch-linux-using-pacman/). Installation sans difficulté. Pas besoin de mettre à jour le GOPATH. Un répertoire go sera créé avec les packages et binaires associés nécessaires.
- Julia : [install Julia in Arch (wiki Arch)](https://wiki.archlinux.org/title/Julia).  Installation sans difficulté. Il convient de paramétrer le chemin de l'exécutable dans l'extension VSCode [source](https://blog.glcs.io/install-julia-and-vscode#heading-installing-julia-2).
- C++ : [Installation & fonctionnement avec make](https://www.youtube.com/watch?v=VXvPpPCF7E0) ; [fonctionnement avec cmake](https://www.youtube.com/watch?v=DMSROwPyhAE)







<br><br><br>
## Installation d'un environnement de développement sur le système hôte avec gestion de containers
Installation de VS-Code par Flatpak puis utilisation de conteneurs pour les développements.  
Au final pas le choix le plus avisé -> il est préférable d'installer l'environnement de dév (VS-Code, git, langage directement dans une distrobox)  


### Container Distrobox  
Cf supra.  
<br>

### Configuration VS Code
Installation de l'environnement en suivant ce guide [VSCode + Dev Containers and Toolbx/Distrobox setup for Fedora Silverblue](https://gist.github.com/lbssousa/bb081e35d483520928033b2797133d5e)  

#### Installation de VS-Code par flatpak
Installation  
```
flatpak --system install flathub com.visualstudio.code
```

Configuration du flatpak  
A partir d'une configuration standard  
```
flatpak --system override --env HOST_DISPLAY="$DISPLAY" --env HOST_SHELL="$SHELL" --env HOST_SSH_AUTH_SOCK="$SSH_AUTH_SOCK" com.visualsudio.code
```
Cela créé le fichier `/var/lib/flatpak/overrides/com.visualsudio.code`
<br>

#### Rend visible podman depuis VS Code sous flatpak  
```
mkdir -p ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin
ln -sf /app/bin/host-spawn ${HOME}/.var/app/com.visualstudio.code/data/node_modules/bin/podman
```
<br>

#### Configuration de VS Code  
1. Lancer VS Code
2. Installer l'extension `Dev Containers`
3. `CTRL+,` pour ouvrir l'éditeur de paramètres
4. Rechercher `docker path` et remplacer la valeur par `podman`
<br>

#### Configuration des containers distrobox (pour VS Code sous flatpak)
Pour **chacun des containers distrobox**  
1. Créer un fichier json dans le répertoire `${HOME}/.var/app/com.visualstudio.code/config/Code/User/globalStorage/ms-vscode-remote.remote-containers/nameConfigs/${YOUR_DISTROBOX_CONTAINER_NAME}.json`
```
{
  "remoteUser": "${localEnv:USER}",
  "settings": {
    "dev.containers.copyGitConfig": false,
    "dev.containers.gitCredentialHelperConfigLocation": "none"
  },

  "terminal.integrated.profiles.linux": {
    "distrobox": {
      "path": "${localEnv:SHELL}",
      "args": [
        "-l"
      ]
    },

    "toolbx": {
      "path": "/usr/sbin/capsh",
      "args": [
        "--caps=",
        "--",
        "-c",
        "exec \"\$@\"",
        "/bin/sh",
        "${localEnv:SHELL}",
        "-l"
      ]
    }
  },

  "terminal.integrated.defaultProfile.linux": "distrobox",

  "remoteEnv": {
    "COLORTERM": "${localEnv:COLORTERM}",
    "DBUS_SESSION_BUS_ADDRESS": "${localEnv:DBUS_SESSION_BUS_ADDRESS}",
    "DESKTOP_SESSION": "${localEnv:DESKTOP_SESSION}",
    "DISPLAY": "${localEnv:HOST_DISPLAY}",
    "LANG": "${localEnv:LANG}",
    "SHELL": "${localEnv:HOST_SHELL}",
    "SSH_AUTH_SOCK": "${localEnv:HOST_SSH_AUTH_SOCK}",
    "TERM": "${localEnv:TERM}",
    "VTE_VERSION": "${localEnv:VTE_VERSION}",
    "XDG_CURRENT_DESKTOP": "${localEnv:XDG_CURRENT_DESKTOP}",
    "XDG_DATA_DIRS": "${localEnv:XDG_DATA_DIRS}",
    "XDG_MENU_PREFIX": "${localEnv:XDG_MENU_PREFIX}",
    "XDG_RUNTIME_DIR": "${localEnv:XDG_RUNTIME_DIR}",
    "XDG_SESSION_DESKTOP": "${localEnv:XDG_SESSION_DESKTOP}",
    "XDG_SESSION_TYPE": "${localEnv:XDG_SESSION_TYPE}"
  }
}
```

2. Créer un répertoire pour les données VS-Code dans le container avec le code
```
sudo mkdir /.vscode-server
sudo chown ${USER}:${USER} /.vscode-server
ln -sf /.vscode-server ${HOME}/.vscode-server
sudo chmod 755 /root
sudo ln -sf /.vscode-server /root/.vscode-server
```






<br><br><br>
fin  
