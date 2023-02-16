import { render, screen, fireEvent } from "@testing-library/react";
import Badge from "./Badge";
import renderer from 'react-test-renderer';

describe('Badge widget tests', () => {
    it('badge shows text string correctly',()=>{
    render(<Badge text="You got a badge!" />);
    const badge = screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("You got a badge!");
    });  
    it('badge shows number correctly',()=>{
    render(<Badge text={4152341234} />);
    const badge = screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent(4152341234);
    }); 
    it('badge shows double byte text correctly',()=>{
    render(<Badge text="美味しい" />);
    const badge = screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("美味しい");
    });  
    it('badge shows special character text correctly',()=>{
    render(<Badge text="Ça va? #@$%" />);
    const badge = screen.getByTestId("badge-test");
    expect(badge).toHaveTextContent("Ça va? #@$%");
    }); 
    it('negative case: badge text cannot have boolean values',()=>{
    render(<Badge text={true} />);
    const badge = screen.getByTestId("badge-test");
    expect(badge).not.toHaveTextContent(true);
    }); 

}) 