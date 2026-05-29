adr = input("Veuillez svp entrer une adresse ipv4 : ")
adr_liste = adr.split(".")
if (len(adr_liste)==4
    and adr_liste[0].isdigit() and int(adr_liste[0])>=0 and int(adr_liste[0])<=255
    and adr_liste[1].isdigit() and int(adr_liste[1])>=0 and int(adr_liste[1])<=255
    and adr_liste[2].isdigit() and int(adr_liste[2])>=0 and int(adr_liste[2])<=255
    and adr_liste[3].isdigit() and int(adr_liste[3])>=0 and int(adr_liste[3])<=255):
    print(f"{adr} est une adresse IPv4 valide.")    
else:
    print(f"{adr} n'est pas une adresse IPv4 valide.")