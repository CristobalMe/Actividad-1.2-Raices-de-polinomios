from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from typing import List, Optional, Union
import MA2008B
import uvicorn

app = FastAPI(
    title="Numerical Methods API",
    description="API for polynomial evaluation and root finding methods",
    version="1.0.0"
)

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models for request validation
class PolynomialInput(BaseModel):
    coefficients: List[float] = Field(..., description="Polynomial coefficients from highest to lowest degree")
    x0: float = Field(..., description="Point at which to evaluate the polynomial")

class DeflationInput(BaseModel):
    coefficients: List[float] = Field(..., description="Polynomial coefficients from highest to lowest degree")
    x0: float = Field(..., description="Root value for deflation")

class QuadraticDeflationInput(BaseModel):
    coefficients: List[float] = Field(..., description="Polynomial coefficients from highest to lowest degree")
    b: float = Field(..., description="Linear term coefficient of the quadratic binomial")
    c: float = Field(..., description="Constant term of the quadratic binomial")

class NewtonRaphsonInput(BaseModel):
    coefficients: List[float] = Field(..., description="Polynomial coefficients from highest to lowest degree")
    x0: float = Field(..., description="Initial guess")
    tol: float = Field(1e-6, description="Tolerance for convergence")
    nmax: int = Field(100, description="Maximum number of iterations")

class MullerInput(BaseModel):
    coefficients: List[float] = Field(..., description="Polynomial coefficients from highest to lowest degree")
    x0: float = Field(..., description="First initial point")
    x1: float = Field(..., description="Second initial point")
    x2: float = Field(..., description="Third initial point")
    tol: float = Field(1e-6, description="Tolerance for convergence")
    nmax: int = Field(100, description="Maximum number of iterations")

@app.get("/")
def read_root():
    return {"message": "Numerical Methods API for MA2008B"}

@app.post("/horner")
def api_horner(input_data: PolynomialInput):
    try:
        px, pdx = MA2008B.horner(input_data.coefficients, input_data.x0)
        return {
            "polynomial_value": px,
            "derivative_value": pdx
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/deflation/linear")
def api_deflation_linear(input_data: DeflationInput):
    try:
        q, r = MA2008B.deflacion_x_x0(input_data.coefficients, input_data.x0)
        return {
            "quotient_coefficients": q,
            "remainder": r
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/deflation/quadratic")
def api_deflation_quadratic(input_data: QuadraticDeflationInput):
    try:
        q, r = MA2008B.deflacion_x2_bc(input_data.coefficients, input_data.b, input_data.c)
        return {
            "quotient_coefficients": q,
            "remainder_coefficients": r
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/newton-raphson")
def api_newton_raphson(input_data: NewtonRaphsonInput):
    try:
        # Create a polynomial function and its derivative using horner
        coeffs = input_data.coefficients
        
        def f(x):
            result, _ = MA2008B.horner(coeffs, x)
            return result
        
        def df(x):
            _, result = MA2008B.horner(coeffs, x)
            return result
        
        result = MA2008B.newton_raphson(f, df, input_data.x0, input_data.tol, input_data.nmax)
        
        if isinstance(result, str):
            return {"status": "error", "message": result}
        else:
            return {"status": "success", "root": float(result)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/muller")
def api_muller(input_data: MullerInput):
    try:
        # Create a polynomial function using horner
        coeffs = input_data.coefficients
        
        def f(x):
            result, _ = MA2008B.horner(coeffs, x)
            return result
        
        result = MA2008B.muller(f, input_data.x0, input_data.x1, input_data.x2, 
                               input_data.tol, input_data.nmax)
        
        if isinstance(result, str):
            return {"status": "error", "message": result}
        else:
            # Handle complex roots
            if isinstance(result, complex):
                return {
                    "status": "success",
                    "root": {
                        "real": float(result.real),
                        "imaginary": float(result.imag)
                    }
                }
            else:
                return {"status": "success", "root": float(result)}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
