import React, { useState, useEffect, useRef } from "react";
import { Toast } from 'primereact/toast';
import { useParams } from 'react-router-dom';
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import { InputText } from 'primereact/inputtext';
import { InputMask } from 'primereact/inputmask';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Link, useNavigate } from "react-router-dom"; 

export function EditarColaboradores(){
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [nome, setNome] = useState();
    const [telefone, setTelfone] = useState();

    const options = [
        {
          label: 'Administrador',
          value: 'Administrador',
        },
        {
          label: 'Vendedor',
          value: 'Vendedor',
        },
        {
            label: 'Gerente',
            value: 'Gerente',  
        }
    ];

    const toast = useRef(null);

    const {id} = useParams();

  
    useEffect(() => {
       buscarDetalhes();
       
    }, []);

    const buscarDetalhes = () => {

        const api = axios.create({
          baseURL: "http://localhost:3000"
      });
    
      api.get("http://localhost:3001/colaboradores/" + id)
      .then((response) =>  {
                         setNome(response.data.nome);
                         setTelfone(response.data.telefone);
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
            telefone,
            idPerfil:selectedCategory  
        };
        try {
          const response = await axios.put(`http://localhost:3001/pedidos/${id}`, data);
          if (response.status === 200) {
            toast.current.show({
              severity: "success",
              summary: "Sucesso",
              detail: "Colaborador atualizado com sucesso!",
              life: 3000
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Erro",
              detail: "Erro ao atualizar o Colaborador",
              life: 3000
            });
          }
        } catch (err) {
          console.error("Erro ao atualizar Colaborador:", err);
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
        <div className="card flex justify-content-center mt-4">
            <Card title="">
                <h4 className="m-0">Editando Colaborador Nº {id}</h4>
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
                            <i className="pi pi-phone"></i>
                        </span>
                        <InputMask id="Telefone" mask="(999) 99999-9999" placeholder="(999) 99999-9999" value={telefone} onChange={(e) => setTelfone(e.target.value)}></InputMask>
                    </div>
                </div>
                <div className="p-col-4 p-md-4">
                    <div className="p-inputgroup">
                        <span className="p-inputgroup-addon">
                            <i className="pi pi-align-justify"></i>
                        </span>
                        <Dropdown value={selectedCategory} onChange={(e) => setSelectedCategory(e.value)} options={options} optionLabel="label" 
                            placeholder="Select Perfil" className="w-full md:w-14rem" />
                    </div>
                </div>
                <div className=" flex flex-wrap justify-content-center gap-3 ml-auto">
                    <Button label="Salvar" raised onClick={()=> editar(history)}/>
                    <Link to="/Paginas/ListaColaborador"> 
                        <Button label="Cancelar"  raised className="buton-cancel"/>
                    </Link>
                </div>
            </div>
      )
}