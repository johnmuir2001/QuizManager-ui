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
        const heading = screen.getAllByText("Log In");
        expect(heading).toHaveLength(2);
    });

    it('should display required fields if input is empty', async () => {
        fireEvent.input(screen.getByPlaceholderText("Password"), {
            target: {
                value: "user"
            }
        })
        fireEvent.click(screen.getByRole("button", { name: "Log In" }))
        expect(await screen.getByText("Username or Password is incorrect")).toBeInTheDocument();
    });
});