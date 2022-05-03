import { render, screen, fireEvent } from "@testing-library/react";
import { createMemoryHistory } from "history";
import React from "react";
import { Router } from "react-router-dom";

import App from "../App";

describe('Login In Inputs', () => {

    beforeEach(() => {
        const history = createMemoryHistory();
        history.push('/login');
        render(
            <Router location={ history.location } navigator={ history }>
                <App />
            </Router>
        );
    });

    it('should render log in page', () => {
        const heading = screen.getByText("Log In");
        expect(heading).toBeInTheDocument();
    });

    it('should display required fields if input is empty', async () => {
        fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: {
                value: "wrong"
            }
        })
        fireEvent.input(screen.getByPlaceholderText("Username"), {
            target: {
                value: "wrong"
            }
        })
        fireEvent.click(screen.getByText("LOG IN"));
        setTimeout(async () => {
            expect(await screen.getByText("Username or Password is incorrect")).toBeInTheDocument();
        }, 1000);
    });

    it("shouldnt display error message if input fields are empty", async () => {
        fireEvent.click(screen.getByText("LOG IN"));
        setTimeout(async () => {
            expect(await screen.getByText("Username or Password is incorrect")).toBeNull();
        }, 1000);
    });

    it("should redirect to home on correct login", async () => {
        const history = createMemoryHistory();
        fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: {
                value: "restricted"
            }
        })
        fireEvent.input(screen.getByPlaceholderText("Username"), {
            target: {
                value: "restricted"
            }
        })
        fireEvent.click(screen.getByText("LOG IN"));
        expect(history.location.pathname).toEqual("/")
    });
});