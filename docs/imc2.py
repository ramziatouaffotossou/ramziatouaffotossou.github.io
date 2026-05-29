poids = float(input("Veuillez svp entrer votre poids en kg : "))
taille = float(input("Veuillez svp entrer votre taille en m : "))
imc = poids/taille**2
if imc < 18.5:
    situation = "maigreur"
elif imc < 25:
    situation = "poids normal"
elif imc < 30:
    situation = "surpoids"
else:
    situation = "obésité"
print(f"Votre IMC est de {round(imc,2)}. Vous êtes dans une situation de {situation}.")
