import cmath

def horner(a, x0):
    """
    Método de Horner para evaluar un polinomio y su derivada en x0.
    Esta función implementa el método de Horner para evaluar eficientemente tanto 
    un polinomio como su derivada primera en un punto específico x0.
    Parámetros:
        a (list): Lista de coeficientes del polinomio, ordenados de mayor a menor grado.
        x0 (float): Punto en el que se evalúa el polinomio y su derivada.
    Retorna:
        - px (float): Valor del polinomio en x0.
        - pdx (float): Valor de la derivada primera del polinomio en x0.
    """
    n = len(a) - 1
    px = a[0]
    pdx = a[0]
    
    for j in range(1, n):
        px = x0 * px + a[j]
        pdx = x0 * pdx + px
    
    px = x0 * px + a[-1]
    return px, pdx

def deflacion_x_x0(a, x0):
    """
    Realiza la deflación de un polinomio por un binomio lineal de la forma (x - x0).
    Esta función divide un polinomio representado por sus coeficientes entre el binomio
    (x - x0), devolviendo el cociente y el residuo de la división.

    Parámetros:
        a (list): Lista de coeficientes del polinomio original, ordenados de mayor a menor grado.
        x0 (float): Valor por el cual se realiza la deflación (raíz del polinomio).
        
    Retorna:
        - q (list): Coeficientes del polinomio cociente.
        - r (float): Residuo de la división (debe ser cero si x0 es raíz del polinomio).
    """
    n = len(a)
    q = [0] * (n - 1)
    q[0] = a[0]
    
    for j in range(1, n - 1):
        q[j] = x0 * q[j - 1] + a[j]
    
    r = x0 * q[-1] + a[-1]
    return q, r

def deflacion_x2_bc(a, b, c):
    """
    Realiza la deflación de un polinomio por un binomio cuadrático de la forma (x² - bx - c).
    Esta función divide un polinomio representado por sus coeficientes entre un binomio
    cuadrático, devolviendo el cociente y el residuo de la división.
    Parámetros:
        a (list): Lista de coeficientes del polinomio original, ordenados de mayor a menor grado.
        b (float): Coeficiente del término lineal del binomio divisor.
        c (float): Término independiente del binomio divisor.

    Retorna:
        - q (list): Coeficientes del polinomio cociente.
        - r (list): Coeficientes del residuo (de grado menor que el divisor).
    """
    n = len(a)
    q = [0] * (n - 2)
    q[0] = a[0]
    q[1] = a[1] + a[0] * b
    
    for j in range(2, n - 1):
        q[j] = a[j] + q[j - 1] * b + q[j - 2] * c
    
    r = [q[-1] * b + q[-2] * c, q[-1] * c]
    return q, r

def newton_raphson(f, df, x0, tol, nmax):
    """
    Implementa el método de Newton-Raphson para encontrar una raíz de la función f(x).

    Parámetros:
        f (callable): Función para la cual se desea encontrar una raíz, es decir, f(x) = 0.
        df (callable): Derivada de la función f.
        x0 (float): Suposición inicial para la raíz.
        tol (float): (por defecto 1e-6) Tolerancia para la convergencia (criterio de parada basado en la diferencia entre aproximaciones sucesivas).
        nmax (int): (por defecto 100) Número máximo de iteraciones a realizar.

    Retorna (float o str):
        - Si tiene éxito, devuelve la raíz aproximada.
        - Si la derivada es cero en alguna iteración, devuelve un mensaje de error.
        - Si se alcanzan el número máximo de iteraciones sin convergencia, devuelve un mensaje de error.

    Notas:
    - El método puede no converger si la suposición inicial está demasiado lejos de una raíz real.
    - Si la función o su derivada tienen comportamiento problemático cerca de la raíz, el método puede fallar.
    """
    for _ in range(nmax):
        f0 = f(x0)
        f1 = df(x0)
        if f1 == 0:
            return "Derivada cero, no se puede continuar"
        x = x0 - f0 / f1
        if abs(x - x0) < tol:
            return x
        x0 = x
    return "No se alcanzó la tolerancia después de nmax iteraciones"

def muller(f, x0, x1, x2, tol, nmax):
    """
    Método de Müller para encontrar una raíz de la función f(x).

    Parametros:
        f (function): La función de la cual se desea encontrar una raíz.
        x0 (float): Primer punto inicial.
        x1 (float): Segundo punto inicial.
        x2 (float): Tercer punto inicial.
        tol (float): Tolerancia para la convergencia del método.
        nmax (int): Número máximo de iteraciones permitidas.

    Retorna:
        float: La aproximación de la raíz de la función f(x) si se alcanza la tolerancia.
        str: Mensaje indicando que no se alcanzó la tolerancia después de nmax iteraciones.
    """
    for _ in range(nmax):
        f0, f1, f2 = f(x0), f(x1), f(x2)
        h1, h2 = x1 - x0, x2 - x1
        delta1, delta2 = (f1 - f0) / h1, (f2 - f1) / h2
        d = (delta2 - delta1) / (h2 + h1)
        
        b = delta2 + h2 * d
        disc = cmath.sqrt(b**2 - 4 * f2 * d)
        ee = b + disc if abs(b - disc) < abs(b + disc) else b - disc
        h = -2 * f2 / ee
        x = x2 + h
        
        if abs(h) < tol:
            return x
        
        x0, x1, x2 = x1, x2, x
    return "No se alcanzó la tolerancia después de nmax iteraciones"
