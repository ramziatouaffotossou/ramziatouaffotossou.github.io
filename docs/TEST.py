def adder(a, b, cin):
    s = a ^ b ^ cin
    cout = (a and b) or (cin and (a ^ b))
    return s, cout

def add_n(num1, num2):
    res = []
    cin = 0

    # On travaille du bit de poids faible au bit de poids fort
    num1 = num1[::-1]  # inverser la liste
    num2 = num2[::-1]

    for i in range(len(num1)):
        ai = num1[i]
        bi = num2[i]
        s, cin = adder(ai, bi, cin)
        res.append(s)

    # Ajouter la retenue finale si elle existe
    if cin:
        res.append(cin)

    # Remettre dans l’ordre MSB -> LSB
    res.reverse()
    return res

# Test
num1 = [0,0,1,1]  # 2
num2 = [0,0,0,1]  # 1
solution = add_n(num1, num2)
print(solution)  # [0,0,1,1] → 3
