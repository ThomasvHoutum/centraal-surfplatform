namespace Business.Services.Interfaces;

public interface ITestService : ITransient
{
    public Task<string> GetTest();
}