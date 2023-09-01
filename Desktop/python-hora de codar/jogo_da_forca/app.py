#Importar módulos
from palavras import palavras
import random

# Seleciona a palavra  
def selecionar_palavra():
    palavra = random.choice(palavras)
    return palavra.upper()

# Iniciar o jogo
def jogar(palavra):
    #Definir algumas variáveis
    palavra_a_completar = "_" * len(palavra)# _ _ _ _ _ _
    adivinhou = False
    letras_utilizadas = []
    palavras_utilizadas = []
    tentativas = 6


    #Boas vindas ao jogador
    print("Vamos jogar! ")
    print(exibir_forca(tentativas))
    print("Esta é a palavra: %s" % palavra_a_completar)

    #Enquanto o usuário não adivinhar e ainda houver tentativas
    while not adivinhou and tentativas > 0:

        tentativa = input("Digite uma palavra ou letra para continuar: ").upper()

        

        #TENTATIVA DE LETRA ÚNICA
        #Verificar se a tentativa é uma única letra
        if len(tentativa) == 1 and tentativa.isalpha():
            #Verificar se a letra já foi utilizada
            if tentativa in letras_utilizadas:
                print("Você já utilizou essa letra antes: %s" % tentativa)

            #Verificar se a tentativa não está na palavra   
            elif tentativa not in palavra:
                print("A letra %s não está na palavra" % tentativa)
                tentativas -= 1
                letras_utilizadas.append(tentativa)
               #Quando a letra está na palavra
            else:
                print("Você acertou!A letra %s está na palavra" % tentativa)
                letras_utilizadas.append(tentativa)
                # Transformar a palavra em uma lista
                palavra_lista = list(palavra_a_completar)

                print(palavra_a_completar)
                #Verifica onde pode substituir o underline baseado na letra que foi passada.
                indices = [i for i, letra in enumerate(palavra) if letra == tentativa]
                for indice in indices:
                    palavra_lista[indice] = tentativa

                palavra_a_completar = "".join(palavra_lista)          

                print(palavra_a_completar)        

                if "_" not in palavra_a_completar:
                    adivinhou = True
                
        # TENTATIVA DE PALAVRA COMPLETA
        # Quando o susuário tenta adivinhar a palavra toda da forca   
        elif len(tentativa) == len(palavra) and tentativa.isalpha():   

            #Palavra já utilizada
            if tentativa in palavras_utilizadas:
                print("Você já utilizou esta palavra %s" % tentativa)
            #Palavra está errada    
            elif tentativa != palavra:
                print("A palavra %s está incorreta!" % tentativa)
                tentativas -= 1
                palavras_utilizadas.append(tentativa)

            #Acertou a palavra
            else:
                adivinhou = True
                palavra_a_completar = palavra
        #Tentativa inválida
        else:
            print("Tentativa inválida, tente novamente")  

        # Exibir o status do jogo
        print(exibir_forca(tentativas))
        print(palavra_a_completar)                      

    #   Finaliza o jogo se o usuário adivinhou a palavra ou acabaram as tentativas
    if adivinhou:
        print("Parabéns! Você acertou a palavra")
    else:
        print("Acabaram as tentativas, a palavra era: %s" % palavra)        


#Status do jogo
def exibir_forca(tentativas):
    estagios = [ #Fim de jogo
            """
                --------
                |       |
                |       o
                |      \\|/
                |       |
                |      / \\
                |
                -
            """,
                # Falta 1 tentativa
            """
                --------
                |       |
                |       o
                |      \\|/
                |       |
                |      / 
                |
                -
            """,
                # Falta 2 tentativas
            """
                --------
                |       |
                |       o
                |      \\|/
                |       |
                |      
                |
                -
            """,
                # Falta 3 tentativas
            """
                --------
                |       |
                |       o
                |      \\|
                |       |
                |      
                |
                -
            """,
                 # Falta 4 tentativas
            """
                --------
                |       |
                |       o
                |       |
                |       |
                |      
                |
                -
            """,
                # Falta 5 tentativas
            """
                --------
                |       |
                |       o
                |       
                |       
                |      
                |
                -
            """,
                 # Estado inicial
            """
                --------
                |       |
                |       
                |       
                |       
                |      
                |
                -
            """,
    ]
    
    return estagios[tentativas]    

#Iniciação do jogo e continuar jogando
def iniciar():
    palavra = selecionar_palavra()
    jogar(palavra)
    # Quando acaba o jogo, verifica se o usuário quer continuar jogando
    while input("Jogar novamente? (S/N)? ").upper() == "S" :
        palavra = selecionar_palavra()
        jogar(palavra)



iniciar()    








