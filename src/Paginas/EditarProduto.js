import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom"; 
import { InputNumber } from 'primereact/inputnumber';
import { useHistory } from 'react-router-dom';

export function EditarProduto(){
    const[nome, setNome] = useState();
    const[unMedida, setUnMedida] = useState();
    const[valor, setValor] = useState();

    const toast = useRef(null);

    const {id} = useParams();

    useEffect(() => {
       buscarDetalhes();
       
    }, []);

    const buscarDetalhes = () => {

        const api = axios.create({
          baseURL: "http://localhost:3000"
      });
    
      api.get("http://localhost:3001/produtos/" + id)
      .then((response) =>  {
                         setNome(response.data.nome);
                         setUnMedida(response.data.unMedida);
                         setValor(response.data.valor);
                        console.log(response.data);   
                          }
      )
      .catch((err) => {
         console.error("erro ao listar");
      }); 
      }



      async function editar() {
        console.log('clicou no editar');
    
        const data = {
            nome,
            unMedida,
            valor
        };
        try {
          const response = await axios.put(`http://localhost:3001/produtos/${id}`, data);
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Sucesso",
              detail: "Produto atualizado com sucesso!",
              life: 3000
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar o Produto",
              life: 3000
            });
          }
        } catch (err) {
          console.error("Erro ao atualizar Produto:", err);
          toast.current.show({
            severity: "error",
            summary: "Erro",
            detail: "Erro ao atualizar o Colaborador: " + err.message,
            life: 3000
          });
        }
      }

//Interface

    return(
        <di>
            <div className="card flex justify-content-center mt-4">
                <Card title="">
                    <h4 className="m-0">Editando Produto Nº {id}</h4>
                </Card>
                <Toast ref={toast}></Toast>
                <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-user"></i>
                        </span>
                        <InputText placeholder="Nome" value={nome} onChange={(e) => setNome(e.target.value)}/>
                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            Un
                        </span>
                        <InputText placeholder="Unidade de Medida" value={unMedida} onChange={(e) => setUnMedida(e.target.value)}/>                    </div>
                </div>
                <div  className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            R$
                        </span>
                        <InputNumber placeholder="Valor R$" value={valor} onValueChange={(e) => setValor(e.value)} minFractionDigits={2} maxFractionDigits={5} />                </div>
                </div>
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> editar(history)}/>
                    <Link to="/Paginas/ListaProduto"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </div>
        </di>
    )
}