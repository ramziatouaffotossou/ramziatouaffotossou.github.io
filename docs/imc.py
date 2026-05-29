poids = float(input("Veuillez svp entrer votre poids en kg : "))
taille = float(input("Veuillez svp entrer votre taille en m : "))
imc = poids/taille**2
print(f"Votre IMC est de {round(imc,2)}")

