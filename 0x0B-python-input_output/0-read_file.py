def read_file(filename=""):
    with open(filename, 'r', encoding='utf-8') as file:
        for line in file:
            print(line, end='')

read_file("example.txt")
