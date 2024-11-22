# Guide d'installation uBlue

D.Bouvier


[Documentation Bazzite](https://docs.bazzite.gg)


## Pré installation

### Type et taille des partitions à créer

|  Partiton          |    Taille          | Type de partition  |
|--------------------|--------------------|--------------------|
|  /boot/efi         |         100 Mo     |        EFI         |
|  /boot             |           1 Go     |        EXT4        |
|  /systemfile       |        > 40 Go     |       BTRFS        |

Détail pour un partitionnement manuel [Fedora Manual Partitioning](https://docs.fedoraproject.org/en-US/fedora-silverblue/installation/)


## Commandes utiles sur une uBlue

### Spécifique à uBlue
Update manuel `ujust update`

### Fedora Atomic
Liste des environnements `rpm-ostree status -v`
Conservation de l'environnement actuel (<n>=0) `sudo ostree admin pin <n>`
Dé-conservation d'un environnement `sudo ostre admin pin --unpin <n>`
rollback vers le précédent environnement `rpm-ostree rollback`

Rechercher un package dans le dépôt ostree `rpm-ostree search <package>`
Installation d'un package sur la couche de base `rpm-ostree install <package>`
Désinstallation d'un package sur la couche de base `rpm-ostree uninstall <package>`

Suppression d'un package livré par défaut dans la couche de base `rpm-ostree override remove <package>`


## Setup du système

### Secure Boot
Suivre ce guide pour réinstaller le Secure Boot
[Documentation Bazzite - Secure Boot Instructions](https://docs.bazzite.gg/General/Installation_Guide/secure_boot/#method-b-after-installation-method)

### Host name
Commande `hostnamectl set-hostname <hostname>`
